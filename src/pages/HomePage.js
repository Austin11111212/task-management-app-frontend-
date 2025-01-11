import React, { useState, useEffect } from 'react';
import { fetchTasks, createTask } from '../services/api';
import TaskCard from '../components/TaskCard'; // Import TaskCard component

const HomePage = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const fetchAllTasks = async () => {
        try {
            const { data } = await fetchTasks();
            setTasks(data);
        } catch (error) {
            console.error('Failed to fetch tasks');
        }
    };

    const createNewTask = async (e) => {
        e.preventDefault();
        try {
            await createTask({ title: newTask });
            setNewTask('');
            fetchAllTasks(); // Re-fetch tasks after adding new one
        } catch (error) {
            console.error('Failed to create task');
        }
    };

    useEffect(() => {
        fetchAllTasks();
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
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Task Management</h1>
            <form onSubmit={createNewTask} style={styles.form}>
                <input
                    type="text"
                    placeholder="New Task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Add Task</button>
            </form>
            <div>
                {tasks.map((task) => (
                    <TaskCard key={task._id} task={task} fetchAllTasks={fetchAllTasks} />
                ))}
            </div>
        </div>
    );
};

export default HomePage; 