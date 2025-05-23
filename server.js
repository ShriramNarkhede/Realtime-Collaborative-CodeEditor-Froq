const express = require('express');
const app = express();

const http = require('http');
const path = require('path');
const {Server} = require('socket.io');
const fs = require('fs');
const { exec } = require('child_process');

const ACTIONS = require('./src/actions/Actions');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  app.use(express.json());



const userSocketMap = {};
function getAllConnectedClients(roomId) {
    // Map
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                username: userSocketMap[socketId],
            };
        }
    );
}

io.on('connection', (socket) => {
    console.log('socket connected', socket.id);

    socket.on(ACTIONS.JOIN, ({roomId, username}) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        clients.forEach(({socketId}) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id,
            });
        });
    });

    socket.on(ACTIONS.CODE_CHANGE, ({roomId, code}) => {
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, {code});
    });

    socket.on(ACTIONS.SYNC_CODE, ({socketId, code}) => {
        io.to(socketId).emit(ACTIONS.CODE_CHANGE, {code});
    });

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    });
});

// Serve response in production
app.get('/', (req, res) => {
    const htmlContent = '<h1>Welcome to the code editor server</h1>';
    res.setHeader('Content-Type', 'text/html');
    res.send(htmlContent);
});

// Python code execution endpoint
app.post('/api/run-python', async (req, res) => {
    const { code } = req.body;
    if (!code) {
        return res.status(400).json({ error: 'No code provided' });
    }
    const filename = `temp_${Date.now()}.py`;
    fs.writeFileSync(filename, code);
    exec(
        `docker run --rm --network none -m 128m --cpus=0.5 -v "${process.cwd()}":/code -w /code python:3.11 python ${filename}`,
        { timeout: 5000 },
        (error, stdout, stderr) => {
            fs.unlinkSync(filename);
            if (error && error.killed) {
                return res.json({ stdout: '', stderr: 'Execution timed out.' });
            }
            res.json({
                stdout,
                stderr,
                error: error && !error.killed ? error.message : null,
            });
        }
    );
});
app.use(express.static('build'));
 // Ensure JSON body parsing
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.SERVER_PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));