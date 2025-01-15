import axios from 'axios';

// Use the base URL from environment variables
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api', // Fallback to localhost in development
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to get token from localStorage
const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.token || null;
};

// Register User
export const registerUser = async (userData) => {
  try {
    // Use the `api` instance here
    const response = await api.post('/users/register', userData);
    console.log('Registration successful:', response.data);
    return response.data; // Return response data if needed
  } catch (error) {
    console.error('Registration error:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : error.message); // Provide better error details
  }
};

// Login User
export const loginUser = async (email, password) => {
  try {
    // Make the API request using the 'api' instance
    const response = await api.post('/users/login', { email, password });

    // Check if the response contains a token
    if (response && response.data && response.data.token) {
      const token = response.data.token; // Extract token from the response
      localStorage.setItem('user', JSON.stringify({ token })); // Store the token in localStorage
      console.log('Token saved to localStorage:', token);

      return response.data; // Return the response data
    } else {
      // If token is missing in the response
      console.error('Login response does not contain a token');
      throw new Error('Login failed: No token received');
    }
  } catch (error) {
    // Log the error if there is an issue with the API request
    if (error.response) {
      // If there's a response from the server, log the server's error message
      console.error('Login error:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'An error occurred during login');
    } else {
      // Handle network errors or other issues that are not from the server
      console.error('Login error:', error.message);
      throw new Error('Login failed: ' + error.message);
    }
  }
};

// Fetch Tasks
export const fetchTasks = async () => {
  const token = getToken();
  if (!token) throw new Error('No token found');

  try {
    // Use the `api` instance to make requests
    const response = await api.get('/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Fetch tasks error:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Create Task
export const createTask = async (taskData) => {
  const token = getToken();
  if (!token) throw new Error('No token found');

  try {
    // Use the `api` instance to make requests
    const response = await api.post('/tasks', taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Create task error:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Update Task
export const updateTask = async (taskId, taskData) => {
  const token = getToken();
  if (!token) throw new Error('No token found');

  try {
    // Use the `api` instance to make requests
    const response = await api.put(`/tasks/${taskId}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Update task error:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Delete Task
export const deleteTask = async (taskId) => {
  const token = getToken();
  if (!token) throw new Error('No token found');

  try {
    // Use the `api` instance to make requests
    const response = await api.delete(`/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Delete task error:', error.response?.data?.message || error.message);
    throw error;
  }
};

export default api;
