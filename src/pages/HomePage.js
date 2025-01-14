import React, { useState, useEffect } from 'react';
import { fetchTasks, createTask } from '../services/api';
import TaskCard from '../components/TaskCard'; // Import TaskCard component

const HomePage = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        deadline: '',  // Date format: 'YYYY-MM-DD'
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
            setNewTask({ title: '', description: '', deadline: '' }); // Reset form fields
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
        },
        heading: {
            textAlign: 'center',
            marginBottom: '1.5rem',
            color: '#333',
        },
        form: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1rem',
        },
        input: {
            padding: '10px',
            marginRight: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '1rem',
        },
        button: {
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
        error: {
            color: 'red',
            textAlign: 'center',
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
                <button type="submit" style={styles.button}>Add Task</button>
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
