import axios from 'axios';

// Use the base URL for the deployed backend
const api = axios.create({
  baseURL: 'https://tast-management-app-backend.onrender.com/api', // Deployed backend URL
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
    const response = await api.post('/users/register', userData);
    console.log('Registration successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Login User
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/users/login', { email, password });

    if (response && response.data && response.data.token) {
      const token = response.data.token;
      localStorage.setItem('user', JSON.stringify({ token }));
      console.log('Token saved to localStorage:', token);

      return response.data;
    } else {
      console.error('Login response does not contain a token');
      throw new Error('Login failed: No token received');
    }
  } catch (error) {
    if (error.response) {
      console.error('Login error:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'An error occurred during login');
    } else {
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
