import React, { useState } from 'react';
import axios from 'axios';

const RequestItem = ({ request, fetchRequests }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newLocation, setNewLocation] = useState(request.location);

    const handleComplete = async () => {
        try {
            await axios.put(
                `${process.env.REACT_APP_API_URL}/requests/${request.id}`,
                { status: 'Completed' },
                {
                    auth: {
                        username: 'admin',
                        password: 'password123'
                    }
                }
            );
            fetchRequests();
        } catch (error) {
            console.error('Error updating request', error);
            alert('Failed to update request. Please check your credentials.');
        }
    };

    const handleRevert = async () => {
        try {
            await axios.put(
                `${process.env.REACT_APP_API_URL}/requests/${request.id}`,
                { status: 'Pending' },
                {
                    auth: {
                        username: 'admin',
                        password: 'password123'
                    }
                }
            );
            fetchRequests();
        } catch (error) {
            console.error('Error reverting request', error);
            alert('Failed to revert request. Please check your credentials.');
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(
                `${process.env.REACT_APP_API_URL}/requests/${request.id}`,
                {
                    auth: {
                        username: 'admin',
                        password: 'password123'
                    }
                }
            );
            fetchRequests();
        } catch (error) {
            console.error('Error deleting request', error);
            alert('Failed to delete request. Please check your credentials.');
        }
    };

    const handleEdit = async () => {
        try {
            await axios.put(
                `${process.env.REACT_APP_API_URL}/requests/${request.id}`,
                { location: newLocation },
                {
                    auth: {
                        username: 'admin',
                        password: 'password123'
                    }
                }
            );
            setIsEditing(false);
            fetchRequests();
        } catch (error) {
            console.error('Error updating request', error);
            alert('Failed to update request. Please check your credentials.');
        }
    };

    return (
        <li>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        placeholder="Location"
                        required
                    />
                    <button onClick={handleEdit}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <span>ID: {request.id} - Location: {request.location} - Status: {request.status}</span>
                    <div>
                        {request.status === 'Pending' && (
                            <>
                                <button onClick={handleComplete}>Complete</button>
                                <button onClick={() => setIsEditing(true)}>Edit</button>
                            </>
                        )}
                        {request.status === 'Completed' && (
                            <>
                                <button onClick={handleRevert}>Revert to Pending</button>
                                <button onClick={() => setIsEditing(true)}>Edit</button>
                            </>
                        )}
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            )}
        </li>
    );
};

export default RequestItem;
