import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';  // Import TaskCard component
import api from '../services/api';   // Assuming api.js handles API requests

const TasksList = ({ isDarkMode }) => {
    const [tasks, setTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // State to hold search query

    // Fetch all tasks from the backend with search functionality
    const fetchAllTasks = async () => {
        try {
            const token = getToken();
            if (!token) throw new Error('No token, authorization denied');

            const response = await api.get('/tasks', {
                headers: { Authorization: `Bearer ${token}` },
                params: { title: searchQuery } // Pass search query as a parameter
            });

            setTasks(response.data);  // Set fetched tasks to state
        } catch (error) {
            console.error('Failed to fetch tasks:', error.response?.data?.message || error.message);
        }
    };

    // Helper to get token from localStorage
    const getToken = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user?.token || null;
    };

    // Fetch tasks when component is mounted or on every fetchAllTasks call
    useEffect(() => {
        fetchAllTasks();
    }, [searchQuery]); // Re-fetch tasks when the search query changes

    // Handle changes in the search input
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); // Update search query state
    };

    return (
        <div style={{ padding: '20px', backgroundColor: isDarkMode ? '#1d1d1d' : '#fff', color: isDarkMode ? '#fff' : '#000' }}>
            <h2>Your Tasks</h2>

            {/* Search input */}
            <input
                type="text"
                placeholder="Search tasks by title..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{
                    padding: '10px',
                    marginBottom: '20px',
                    width: '100%',
                    maxWidth: '400px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                }}
            />

            {tasks.length === 0 ? (
                <p>No tasks available</p>
            ) : (
                tasks.map((task) => (
                    <TaskCard
                        key={task._id}
                        task={task}
                        fetchAllTasks={fetchAllTasks}  // Pass fetchAllTasks to TaskCard to refresh the task list after update or delete
                        isDarkMode={isDarkMode}  // Pass dark mode flag to TaskCard
                    />
                ))
            )}
        </div>
    );
};

export default TasksList;
