import React, {useState} from 'react';
import {v4 as uuidV4} from 'uuid';
import toast from 'react-hot-toast';
import {Link, useNavigate} from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');

    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
        toast.success('Created a new room');
    };

    const joinRoom = () => {
        if (!roomId || !username) {
            toast.error('ROOM ID & username is required');
            return;
        }
        navigate(`/editor/${roomId}`, {
            state: { username },
        });
    };

    const handleInputEnter = (e) => {
        if (e.code === 'Enter') {
            joinRoom();
        }
    };

    return (
        <div className="homePageWrapper" style={{background: 'var(--background)', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingBottom: '2rem'}}>
            <div className="formWrapper" style={{background: 'var(--surface)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', borderRadius: '20px', padding: '2.5rem 2rem', width: '100%', maxWidth: '420px', border: '1px solid var(--border)'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem'}}>
                    <img className="homePageLogo" src="/logo21.png" alt="teamsphere-logo" style={{height: '150px', marginBottom: '1rem'}} />
                  
                    <span style={{color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.5rem', textAlign: 'center'}}>Collaborate. Code. Create.<br/>The next-gen real-time code editor for teams.</span>
                </div>
                <h4 className="mainLabel" style={{color: 'var(--text-primary)', fontWeight: 600, fontSize: '1.1rem', marginBottom: '1.5rem', textAlign: 'center'}}>Join a workspace or create a new one</h4>
                <div className="inputGroup" style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="Room ID"
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                        onKeyUp={handleInputEnter}
                        style={{background: 'var(--surface-light)', color: 'var(--text-primary)', border: '1px solid var(--border)', fontSize: '1rem', borderRadius: '8px', padding: '0.75rem', outline: 'none'}}
                    />
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="Your Name"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        onKeyUp={handleInputEnter}
                        style={{background: 'var(--surface-light)', color: 'var(--text-primary)', border: '1px solid var(--border)', fontSize: '1rem', borderRadius: '8px', padding: '0.75rem', outline: 'none'}}
                    />
                    <button className="btn joinBtn" onClick={joinRoom} style={{background: 'var(--primary)', color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.1rem', borderRadius: '8px', padding: '0.75rem', border: 'none', marginTop: '0.5rem', transition: 'background 0.2s'}}>
                        Join Workspace
                    </button>
                    <span className="createInfo" style={{color: 'var(--text-secondary)', fontSize: '0.98rem', textAlign: 'center', marginTop: '0.5rem'}}>
                        Don&apos;t have a workspace?{' '}
                        <Link onClick={createNewRoom} className="createNewBtn" style={{color: 'var(--secondary)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline'}}>Create one</Link>
                    </span>
                </div>
            </div>
            <footer style={{marginTop: '2.5rem', color: 'var(--text-muted)', fontSize: '1rem', textAlign: 'center'}}>
                <h4 style={{margin: 0, fontWeight: 400}}>
                    Built By 
                    <Link to="https://www.linkedin.com/in/shriramnarkhede/" target="_blank" rel="noopener noreferrer" style={{color: 'var(--primary-light)', textDecoration: 'none'}}> Shriram Narkhede</Link>
                </h4>
            </footer>
        </div>
    );
};

export default Home;