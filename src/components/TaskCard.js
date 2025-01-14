import React, { useState } from 'react';
import api from '../services/api'; // Ensure correct path to your api file

const TaskCard = ({ task, fetchAllTasks }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTask, setUpdatedTask] = useState({
        title: task.title,
        description: task.description,
        deadline: task.deadline,
        status: task.status || 'in progress', // Default to 'in progress' if no status
        priority: task.priority || 'medium', // Default to 'medium' if no priority
    });

    // Helper to get token from localStorage
    const getToken = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user?.token || null;
    };

    // Function to handle task deletion
    const deleteTask = async () => {
        try {
            const token = getToken();
            if (!token) throw new Error('No token, authorization denied');

            await api.delete(`/tasks/${task._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Task deleted successfully');
            fetchAllTasks(); // Refresh task list
        } catch (error) {
            console.error('Failed to delete task:', error.response?.data?.message || error.message);
            alert('Failed to delete task: ' + (error.response?.data?.message || error.message));
        }
    };

    // Function to handle task updates
    const updateTaskHandler = async () => {
        try {
            const token = getToken();
            if (!token) throw new Error('No token, authorization denied');

            const updatedData = {
                title: updatedTask.title,
                description: updatedTask.description,
                deadline: updatedTask.deadline,
                status: updatedTask.status,
                priority: updatedTask.priority,
            };

            await api.put(`/tasks/${task._id}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Task updated successfully');
            fetchAllTasks(); // Refresh task list
            setIsEditing(false); // Exit editing mode
        } catch (error) {
            console.error('Failed to update task:', error.response?.data?.message || error.message);
            alert('Failed to update task: ' + (error.response?.data?.message || error.message));
        }
    };

    // Handle input changes in the edit form
    const handleInputChange = (field, value) => {
        setUpdatedTask((prevTask) => ({ ...prevTask, [field]: value }));
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            {isEditing ? (
                // Edit Task Form
                <div>
                    <h3>Edit Task</h3>
                    <input
                        type="text"
                        value={updatedTask.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Task title"
                        style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                    />
                    <textarea
                        value={updatedTask.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Task description"
                        style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                    />
                    <input
                        type="date"
                        value={updatedTask.deadline}
                        onChange={(e) => handleInputChange('deadline', e.target.value)}
                        style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                    />
                    <select
                        value={updatedTask.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                    >
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <select
                        value={updatedTask.priority}
                        onChange={(e) => handleInputChange('priority', e.target.value)}
                        style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <button
                        onClick={updateTaskHandler}
                        style={{
                            backgroundColor: 'green',
                            color: '#fff',
                            padding: '0.5rem',
                            marginRight: '0.5rem',
                        }}
                    >
                        Save Changes
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        style={{ backgroundColor: 'gray', color: '#fff', padding: '0.5rem' }}
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                // Display Task Details
                <div>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p><strong>Deadline:</strong> {task.deadline}</p>
                    <p><strong>Status:</strong> {task.status}</p>
                    <p><strong>Priority:</strong> {task.priority}</p>
                    <button
                        onClick={deleteTask}
                        style={{
                            backgroundColor: 'red',
                            color: '#fff',
                            padding: '0.5rem',
                            marginRight: '0.5rem',
                        }}
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => setIsEditing(true)}
                        style={{ backgroundColor: 'blue', color: '#fff', padding: '0.5rem' }}
                    >
                        Update
                    </button>
                </div>
            )}
        </div>
    );
};

export default TaskCard;
