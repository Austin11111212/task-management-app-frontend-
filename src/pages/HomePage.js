import React, { useState, useEffect } from 'react';
import { fetchTasks, createTask } from '../services/api';
import TaskCard from '../components/TaskCard'; // Import TaskCard component

const HomePage = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        deadline: '',  // Date format: 'YYYY-MM-DD'
        status: 'in progress',
        priority: 'low'
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

    const styles = {
        container: {
            padding: '2rem',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f4f4f4',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        heading: {
            textAlign: 'center',
            marginBottom: '1.5rem',
            color: '#333',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '1rem',
            gap: '0.5rem',
        },
        input: {
            padding: '10px',
            marginRight: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '1rem',
            width: '100%',
            maxWidth: '400px',
        },
        select: {
            padding: '10px',
            marginRight: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '1rem',
            width: '100%',
            maxWidth: '400px',
        },
        button: {
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            maxWidth: '400px',
            width: '100%',
        },
        error: {
            color: 'red',
            textAlign: 'center',
        },
        taskList: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
        },
        loading: {
            textAlign: 'center',
            fontSize: '1.2rem',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Task Management</h1>

            {/* Display error if any */}
            {error && <p style={styles.error}>{error}</p>}

            {/* Task creation form */}
            <form onSubmit={createNewTask} style={styles.form}>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={newTask.title}
                    onChange={handleChange}
                    name="title"
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Task Description"
                    value={newTask.description}
                    onChange={handleChange}
                    name="description"
                    style={styles.input}
                />
                <input
                    type="date"
                    value={newTask.deadline}
                    onChange={handleChange}
                    name="deadline"
                    style={styles.input}
                />
                <select
                    value={newTask.status}
                    onChange={handleChange}
                    name="status"
                    style={styles.select}
                >
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <select
                    value={newTask.priority}
                    onChange={handleChange}
                    name="priority"
                    style={styles.select}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <button type="submit" style={styles.button}>Add Task</button>
            </form>

            {/* Display tasks */}
            {loading ? (
                <p style={styles.loading}>Loading tasks...</p>
            ) : (
                <div style={styles.taskList}>
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
