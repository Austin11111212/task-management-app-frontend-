import React from 'react';
import { updateTask, deleteTask } from '../services/api';

const TaskCard = ({ task, fetchAllTasks }) => {
    const updateTaskStatus = async () => {
        const newStatus = task.status === 'completed' ? 'incomplete' : 'completed';
        try {
            await updateTask(task._id, { status: newStatus });
            fetchAllTasks(); // Re-fetch tasks to update UI
        } catch (error) {
            console.error('Failed to update task status');
        }
    };

    const deleteTaskHandler = async () => {
        try {
            await deleteTask(task._id); // Make the API call to delete task
            fetchAllTasks(); // Re-fetch tasks to update UI
        } catch (error) {
            console.error('Failed to delete task');
        }
    };

    const styles = {
        task: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px',
            borderBottom: '1px solid #ddd',
            borderRadius: '4px',
            marginBottom: '0.5rem',
        },
        completed: {
            color: 'green',
            textDecoration: 'line-through',
        },
        incomplete: {
            color: 'black',
        },
        taskButtons: {
            display: 'flex',
            gap: '10px',
        },
        button: {
            padding: '8px 15px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
    };

    return (
        <div style={styles.task}>
            <span style={task.status === 'completed' ? styles.completed : styles.incomplete}>
                {task.title}
            </span>
            <div style={styles.taskButtons}>
                <button
                    style={styles.button}
                    onClick={updateTaskStatus}
                >
                    {task.status === 'completed' ? 'Undo' : 'Complete'}
                </button>
                <button
                    style={styles.button}
                    onClick={deleteTaskHandler}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskCard;