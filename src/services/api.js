import axios from 'axios';

// Create an Axios instance with base URL
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Attach token to headers for authenticated requests
API.interceptors.request.use(
    (req) => {
        const token = localStorage.getItem('token');
        if (token) {
            req.headers.Authorization = `Bearer ${token}`;
        }
        return req;
    },
    (error) => {
        return Promise.reject(error); // Handle request errors
    }
);

// Handle responses and errors globally
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            console.error('API Error:', error.response.data.message || error.response.statusText);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.message);
        } else {
            // Something happened in setting up the request that triggered an error
            console.error('Request Error:', error.message);
        }
        return Promise.reject(error);
    }
);

// API functions for users
export const registerUser = (data) => API.post('/users/register', data);
export const loginUser = (data) => API.post('/users/login', data);

// API functions for tasks
export const fetchTasks = () => API.get('/tasks');
export const createTask = (data) => API.post('/tasks', data);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data); // Updated task
export const deleteTask = (id) => API.delete(`/tasks/${id}`); // Delete task
