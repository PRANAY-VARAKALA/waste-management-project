import React, { useState } from 'react';
import axios from 'axios';

const AddRequestForm = ({ fetchRequests }) => {
    const [location, setLocation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!location) return;
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/requests`, { location }, {
                auth: {
                    username: 'admin',
                    password: 'password123'
                }
            });
            setLocation('');
            fetchRequests();
        } catch (error) {
            console.error('Error adding request', error);
            alert('Failed to add request. Please check your credentials.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
                required
            />
            <button type="submit">Add Request</button>
        </form>
    );
};

export default AddRequestForm;
