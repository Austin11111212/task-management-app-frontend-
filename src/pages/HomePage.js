// HomePage.jsx
import React, { useState, useEffect } from 'react';
import { fetchTasks, createTask } from '../services/api';
import TaskCard from '../components/TaskCard';

const HomePage = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        deadline: '', // Date format: 'YYYY-MM-DD'
        status: 'in progress',
        priority: 'low',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch all tasks on component mount
    const fetchAllTasks = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await fetchTasks();
            setTasks(data); // Set tasks in state
        } catch (error) {
            setError('Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    // Handle form change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTask((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission to create a new task
    const createNewTask = async (e) => {
        e.preventDefault();
        try {
            await createTask(newTask); // Send new task to API
            setNewTask({ title: '', description: '', deadline: '', status: 'in progress', priority: 'low' }); // Reset form fields
            fetchAllTasks(); // Re-fetch tasks after adding new one
        } catch (error) {
            console.error('Failed to create task', error);
            setError('Failed to create task');
        }
    };

    useEffect(() => {
        fetchAllTasks(); // Initial task fetch
    }, []);

    return (
        <div style={{ padding: '2rem', backgroundColor: '#f4f4f4' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>Task Management</h1>

            {/* Display error if any */}
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            {/* Task creation form */}
            <form onSubmit={createNewTask} style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={newTask.title}
                    onChange={handleChange}
                    name="title"
                    required
                    style={{ padding: '10px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    type="text"
                    placeholder="Task Description"
                    value={newTask.description}
                    onChange={handleChange}
                    name="description"
                    style={{ padding: '10px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    type="date"
                    value={newTask.deadline}
                    onChange={handleChange}
                    name="deadline"
                    style={{ padding: '10px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <select
                    name="status"
                    value={newTask.status}
                    onChange={handleChange}
                    style={{ padding: '10px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <select
                    name="priority"
                    value={newTask.priority}
                    onChange={handleChange}
                    style={{ padding: '10px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>Add Task</button>
            </form>

            {/* Display tasks */}
            {loading ? (
                <p>Loading tasks...</p>
            ) : (
                <div>
                    {tasks.length === 0 ? (
                        <p>No tasks found</p>
                    ) : (
                        tasks.map((task) => (
                            <TaskCard key={task._id} task={task} fetchAllTasks={fetchAllTasks} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default HomePage;
