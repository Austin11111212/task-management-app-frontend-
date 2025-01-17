import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AddTaskPage = () => {
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        deadline: '',
        priority: 'low',
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setTaskData({ ...taskData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null); // Reset error before submitting
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user?.token;

            if (!token) {
                navigate('/login');
                return;
            }

            if (new Date(taskData.deadline) < new Date()) {
                setError('Deadline cannot be in the past.');
                setIsLoading(false);
                return;
            }

            await api.post('/tasks', taskData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert('Task added successfully!');
            setTaskData({
                title: '',
                description: '',
                deadline: '',
                priority: 'low',
            });
            navigate('/'); // Navigate back to the homepage
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/'); // Navigate back to the homepage without submitting
    };

    return (
        <div className="add-task-container">
            <style>
                {`
                    .add-task-container {
                        padding: 1rem;
                        max-width: 600px;
                        margin: 0 auto;
                        box-sizing: border-box;
                    }

                    h1 {
                        font-size: 1.5rem;
                        margin-bottom: 1rem;
                    }

                    .task-form {
                        display: flex;
                        flex-direction: column;
                    }

                    .form-group {
                        margin-bottom: 1rem;
                    }

                    label {
                        display: block;
                        font-size: 1rem;
                        margin-bottom: 0.25rem;
                    }

                    .form-input {
                        width: 100%;
                        padding: 0.5rem;
                        font-size: 1rem;
                        box-sizing: border-box;
                    }

                    .submit-button {
                        background-color: #007BFF;
                        color: #fff;
                        padding: 0.75rem 1.5rem;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 1rem;
                    }

                    .submit-button:disabled {
                        background-color: #d6d6d6;
                        cursor: not-allowed;
                    }

                    .cancel-button {
                        background-color: #6c757d;
                        color: #fff;
                        padding: 0.75rem 1.5rem;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 1rem;
                        margin-top: 1rem;
                    }

                    .cancel-button:hover {
                        background-color: #5a6268;
                    }

                    .error-message {
                        color: red;
                        font-size: 1rem;
                        margin-top: 0.5rem;
                    }

                    @media (max-width: 768px) {
                        .add-task-container {
                            padding: 1rem;
                        }

                        h1 {
                            font-size: 1.25rem;
                        }

                        .form-input {
                            font-size: 0.875rem;
                        }

                        .submit-button,
                        .cancel-button {
                            padding: 0.5rem 1rem;
                            font-size: 0.875rem;
                        }
                    }
                `}
            </style>
            <h1>Add Task</h1>
            <form onSubmit={handleSubmit} className="task-form">
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={taskData.title}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={taskData.description}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Deadline:</label>
                    <input
                        type="date"
                        name="deadline"
                        value={taskData.deadline}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Priority:</label>
                    <select
                        name="priority"
                        value={taskData.priority}
                        onChange={handleChange}
                        className="form-input"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="submit-button" disabled={isLoading}>
                    {isLoading ? 'Adding...' : 'Add Task'}
                </button>
                <button type="button" className="cancel-button" onClick={handleCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default AddTaskPage;
