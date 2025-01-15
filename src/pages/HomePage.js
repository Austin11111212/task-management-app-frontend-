import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import TaskCard from '../components/TaskCard';


const HomePage = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchAllTasks = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user?.token;

            if (!token) {
                throw new Error('Unauthorized. Please log in again.');
            }

            const response = await api.get('/tasks', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllTasks();
    }, []);

    const handleAddTaskClick = () => {
        navigate('/add-task'); // Redirect to add-task page
    };

    return (
        <div style={{
            padding: '1rem',
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Task Management</h1>
            <button
                onClick={handleAddTaskClick}
                style={{
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    padding: '0.75rem 1.5rem',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginBottom: '1rem',
                }}
            >
                Add Task
            </button>

            {loading ? (
                <p>Loading tasks...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : tasks.length === 0 ? (
                <p>No tasks found. Click "Add Task" to create one.</p>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1rem',
                    width: '100%',
                }}>
                    {tasks.map((task) => (
                        <TaskCard key={task._id} task={task} fetchAllTasks={fetchAllTasks} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;
