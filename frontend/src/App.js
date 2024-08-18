import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import AddRequestForm from './components/AddRequestForm';
import RequestList from './components/RequestList';

const App = () => {
    const [requests, setRequests] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);

    const fetchRequests = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/requests`, {
                auth: {
                    username: 'admin',
                    password: 'password123'
                }
            });
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching requests', error);
        }
    };

    const handleLogin = async (username, password) => {
        if (username === 'admin' && password === 'password123') {
            setAuthenticated(true);
            await fetchRequests();
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="container">
            <header>
                <h1>Waste Management System</h1>
            </header>
            {!authenticated ? (
                <LoginForm onLogin={handleLogin} />
            ) : (
                <>
                    <AddRequestForm fetchRequests={fetchRequests} />
                    <RequestList requests={requests} fetchRequests={fetchRequests} />
                </>
            )}
        </div>
    );
};

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default App;
