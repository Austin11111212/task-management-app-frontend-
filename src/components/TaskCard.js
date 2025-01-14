import React, { useState } from 'react';
import api from '../services/api'; // Ensure correct path to your api file

const TaskCard = ({ task, fetchAllTasks }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTask, setUpdatedTask] = useState({
        title: task.title,
        description: task.description,
        deadline: task.deadline,
        status: task.status,
        priority: task.priority,
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
        <div style={styles.card}>
            {isEditing ? (
                // Edit Task Form
                <div>
                    <h3>Edit Task</h3>
                    <input
                        type="text"
                        value={updatedTask.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Task title"
                        style={styles.input}
                    />
                    <textarea
                        value={updatedTask.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Task description"
                        style={styles.textarea}
                    />
                    <input
                        type="date"
                        value={updatedTask.deadline}
                        onChange={(e) => handleInputChange('deadline', e.target.value)}
                        style={styles.input}
                    />
                    <select
                        value={updatedTask.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        style={styles.select}
                    >
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <select
                        value={updatedTask.priority}
                        onChange={(e) => handleInputChange('priority', e.target.value)}
                        style={styles.select}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <button onClick={updateTaskHandler} style={styles.saveButton}>
                        Save Changes
                    </button>
                    <button onClick={() => setIsEditing(false)} style={styles.cancelButton}>
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
                    <button onClick={deleteTask} style={styles.deleteButton}>
                        Delete
                    </button>
                    <button onClick={() => setIsEditing(true)} style={styles.updateButton}>
                        Update
                    </button>
                </div>
            )}
        </div>
    );
};

// Styles with responsiveness
const styles = {
    card: {
        border: '1px solid #ccc',
        padding: '1rem',
        marginBottom: '1rem',
        backgroundColor: '#fff',
        borderRadius: '8px',
        transition: 'transform 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '1rem',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        height: '100px',
    },
    select: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '1rem',
    },
    saveButton: {
        padding: '10px 20px',
        backgroundColor: 'green',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '100%',
    },
    cancelButton: {
        padding: '10px 20px',
        backgroundColor: 'gray',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '100%',
    },
    deleteButton: {
        backgroundColor: 'red',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        marginRight: '10px',
        width: '100%',
    },
    updateButton: {
        backgroundColor: 'blue',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        width: '100%',
    },
};

// Media Queries for Responsiveness
const mediaQueries = {
    '@media (min-width: 768px)': {
        card: {
            width: '48%',
            marginRight: '2%',
        },
    },
    '@media (min-width: 1024px)': {
        card: {
            width: '30%',
            marginRight: '2%',
        },
    },
};

export default TaskCard;
