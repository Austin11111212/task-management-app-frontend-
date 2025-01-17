import React, { useState } from 'react';
import api from '../services/api'; // Ensure correct path to your api file

const TaskCard = ({ task, fetchAllTasks, isDarkMode }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTask, setUpdatedTask] = useState({ ...task });

    // Helper to get token from localStorage
    const getToken = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user?.token || null;
    };

    // Format date to "Day, Month Year"
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    // Handle task deletion
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
            console.error('Failed to delete task:', error);
            alert('Failed to delete task');
        }
    };

    // Handle task updates
    const updateTaskHandler = async () => {
        try {
            const token = getToken();
            if (!token) throw new Error('No token, authorization denied');

            await api.put(`/tasks/${task._id}`, updatedTask, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Task updated successfully');
            fetchAllTasks(); // Refresh task list
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update task:', error);
            alert('Failed to update task');
        }
    };

    // Handle input changes
    const handleInputChange = (field, value) => {
        setUpdatedTask((prev) => ({ ...prev, [field]: value }));
    };

    const styles = {
        card: {
            border: '1px solid #ccc',
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: '8px',
            transition: 'transform 0.3s ease, background-color 0.3s ease',
            backgroundColor: isDarkMode ? '#333' : '#fff',
            color: isDarkMode ? '#fff' : '#000',
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
        button: {
            padding: '10px 20px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            marginTop: '8px',
        },
        saveButton: {
            backgroundColor: 'green',
            color: '#fff',
        },
        cancelButton: {
            backgroundColor: 'gray',
            color: '#fff',
        },
        deleteButton: {
            backgroundColor: 'red',
            color: '#fff',
        },
        editButton: {
            backgroundColor: 'blue',
            color: '#fff',
        },
    };

    return (
        <div style={styles.card}>
            {isEditing ? (
                <div>
                    <h3>Edit Task</h3>
                    <input
                        type="text"
                        value={updatedTask.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Task Title"
                        style={styles.input}
                    />
                    <textarea
                        value={updatedTask.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Task Description"
                        style={styles.textarea}
                    />
                    <input
                        type="date"
                        value={updatedTask.deadline.split('T')[0]} // Ensure correct date format
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
                    <button onClick={updateTaskHandler} style={{ ...styles.button, ...styles.saveButton }}>
                        Save Changes
                    </button>
                    <button onClick={() => setIsEditing(false)} style={{ ...styles.button, ...styles.cancelButton }}>
                        Cancel
                    </button>
                </div>
            ) : (
                <div>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p><strong>Deadline:</strong> {formatDate(task.deadline)}</p>
                    <p><strong>Status:</strong> {task.status}</p>
                    <p><strong>Priority:</strong> {task.priority}</p>
                    <button onClick={deleteTask} style={{ ...styles.button, ...styles.deleteButton }}>
                        Delete
                    </button>
                    <button onClick={() => setIsEditing(true)} style={{ ...styles.button, ...styles.editButton }}>
                        Edit
                    </button>
                </div>
            )}
        </div>
    );
};

export default TaskCard;
