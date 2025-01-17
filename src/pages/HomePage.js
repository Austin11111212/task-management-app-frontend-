import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import TaskCard from '../components/TaskCard';
import { FaBell, FaSearch } from 'react-icons/fa'; // Icons for search and notifications
import { toast } from 'react-toastify'; // Toast for notifications

const HomePage = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [sortCriteria, setSortCriteria] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(false); // Dark mode state
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
            setFilteredTasks(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllTasks();
    }, []);

    useEffect(() => {
        let filtered = tasks;

        if (searchTerm) {
            filtered = filtered.filter(
                (task) =>
                    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    task.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterStatus) {
            filtered = filtered.filter((task) => task.status === filterStatus);
        }

        if (sortCriteria) {
            filtered = [...filtered].sort((a, b) => {
                if (sortCriteria === 'deadline') {
                    return new Date(a.deadline) - new Date(b.deadline);
                }
                if (sortCriteria === 'priority') {
                    return b.priority - a.priority;
                }
                return 0;
            });
        }

        setFilteredTasks(filtered);
    }, [searchTerm, filterStatus, sortCriteria, tasks]);

    const handleAddTaskClick = () => {
        navigate('/add-task'); // Redirect to add-task page
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    // Dark mode styles
    const pageStyles = darkMode ? {
        backgroundColor: '#2E2E2E',
        color: '#FFF',
    } : {
        backgroundColor: '#f4f4f4',
        color: '#333',
    };

    return (
        <div style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto', ...pageStyles }}>
            <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Task Management</h1>
            
            {/* Dark Mode Toggle Button */}
            <button onClick={toggleDarkMode} style={{ padding: '0.5rem', marginBottom: '1rem' }}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>

            {/* Search, Filter, and Sort Controls */}
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                    <option value="">All Statuses</option>
                    <option value="completed">Completed</option>
                    <option value="in progress">In Progress</option>
                </select>
                <select
                    value={sortCriteria}
                    onChange={(e) => setSortCriteria(e.target.value)}
                    style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                    <option value="">Sort By</option>
                    <option value="deadline">Deadline</option>
                    <option value="priority">Priority</option>
                </select>
            </div>

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
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                    <div style={{ border: '4px solid rgba(0, 0, 0, 0.1)', width: '36px', height: '36px', borderRadius: '50%', borderLeftColor: '#007BFF', animation: 'spin 1s linear infinite' }} />
                </div>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : filteredTasks.length === 0 ? (
                <div>
                    <p>No tasks found. Adjust your filters or search criteria.</p>
                    <button onClick={handleAddTaskClick}>Create Your First Task</button>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', width: '100%' }}>
                    {filteredTasks.map((task) => (
                        <TaskCard key={task._id} task={task} fetchAllTasks={fetchAllTasks} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;
