# Froq: Realtime Collaborative Code Editor

## Introduction

Are you tired of sending code snippets back and forth, struggling to debug and collaborate with your team? Look no further! **Froq** is here to revolutionize the way you code together. This powerful and intuitive collaborative code editor is designed to empower developers and teams to work seamlessly in real-time, regardless of their location. With **Froq**, you can code together, debug together, and ship faster, together.

## Features

- **Real-time Collaboration**: Multiple users can join a room and edit code together with instant synchronization
- **Live Code Execution**: Run Python code directly in the browser with Docker containerization
- **Smart Syntax Highlighting**: Supports syntax highlighting for multiple programming languages
- **Customizable Themes**: Choose from a variety of themes based on your preferences
- **Room Management**: Copy room IDs to clipboard and share with team members
- **User Presence**: See who's connected and when users join/leave in real-time
- **Persistent Sessions**: Users can leave and rejoin rooms to continue editing
- **Modern UI**: Beautiful, professional interface with Froq branding

### Prerequisites

#### For running via Docker

- Docker (25.0.4)
- Docker Compose (1.29.2)

#### For running locally

- Node.js (v20.11.1)
- npm (10.2.4)
- pm2 (5.3.1) : run `npm i -g pm2` to install pm2 globally
- Docker (for Python code execution feature)

**Note:** We recommend using nvm (v0.39.7) to manage your node versions. View nvm official [documentation](https://github.com/nvm-sh/nvm) to install it.

## Tech Stack

- **Frontend**: React.js with modern hooks and state management
- **Backend**: Node.js with Express.js
- **Real-time Communication**: Socket.io for live collaboration
- **Code Editor**: CodeMirror with extensive language and theme support
- **Code Execution**: Docker containers for safe Python code execution
- **Styling**: Custom CSS with CSS variables for consistent theming
- **State Management**: Recoil for global state management
- **Notifications**: React-Toastify for user feedback

## Installation


1. **Clone this repository and navigate to it:**
   ```bash
   git clone https://github.com/Mohitur669/Realtime-Collaborative-Code-Editor.git
   cd Realtime-Collaborative-Code-Editor
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root folder
   - Copy the content from `example.env` and add necessary credentials:
     ```
     REACT_APP_BACKEND_URL=http://localhost:5000
     SERVER_PORT=5000
     ```

4. **Start the backend server:**
   - In one terminal, run:
     ```bash
     npm run server:dev
     ```
   - Or if you prefer pm2:
     ```bash
     pm2 start server.js
     ```
   - You should see: `Listening on port 5000`

5. **Start the React frontend:**
   - In another terminal, run:
     ```bash
     npm start
     ```
   - This will open your browser to `http://localhost:3000`

6. **Test the application:**
   - Create a new room by clicking the "create new room" button
   - Enter a username of your choice
   - Copy the room ID using the "Copy ROOM ID" button
   - Open another browser window/tab and join the same room using the room ID

7. **Test Python code execution:**
   - Select "Python" as the language in the sidebar
   - Write some Python code (e.g., `print("Hello, Froq!")`)
   - Click the "Run Python" button to execute your code

**Note:** To stop your server, press `Ctrl+c` or if you used "pm2", then use `pm2 stop server.js` in the terminal.
