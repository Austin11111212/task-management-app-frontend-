import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';  // Assuming loginUser is a function that handles the login API request
import { FaEye, FaEyeSlash } from 'react-icons/fa';  // Import icons for password visibility toggle

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Track password visibility
    const [isLoading, setIsLoading] = useState(false); // Add loading state
    const [error, setError] = useState(''); // Error state for displaying errors
    const navigate = useNavigate();

    // Check if a token exists in localStorage before showing the login page
    const token = localStorage.getItem('token');
    if (token) {
        navigate('/'); // Redirect to home or dashboard if already logged in
    }

    const loginHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading to true when login starts
        setError(''); // Clear any previous errors
    
        try {
            const response = await loginUser(email, password); // Get the response from loginUser
            console.log('Login API Response:', response);  // Log the response
    
            if (response?.token) {  // Check if token exists in the response
                localStorage.setItem('token', response.token); // Store the token
                setEmail('');
                setPassword('');
                navigate('/');  // Redirect to home page after successful login
            } else {
                setError('Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error('Login Error:', error);  // Log the error to debug
            setError('Invalid credentials. Please try again.');
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };
    

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle password visibility
    };

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f4f4f4',
            fontFamily: 'Arial, sans-serif',
        },
        form: {
            backgroundColor: '#fff',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '400px',
        },
        heading: {
            textAlign: 'center',
            marginBottom: '1.5rem',
            color: '#333',
        },
        inputContainer: {
            position: 'relative',
            marginBottom: '1rem',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '1rem',
        },
        passwordIcon: {
            position: 'absolute',
            right: '10px',
            bottom: '-10%', // Adjusted from '50%' to '55%' to shift it down
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            color: '#888',
        },
        button: {
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer',
            marginTop: '1rem',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
        loadingText: {
            textAlign: 'center',
            color: '#666',
            marginTop: '1rem',
        },
        errorText: {
            color: 'red',
            textAlign: 'center',
            marginTop: '1rem',
        },
        signUpText: {
            textAlign: 'center',
            marginTop: '1rem',
            fontSize: '0.9rem',
        },
        signUpLink: {
            color: '#007bff',
            cursor: 'pointer',
            textDecoration: 'none',
        }
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={loginHandler}>
                <h1 style={styles.heading}>Login</h1>
                {error && <p style={styles.errorText}>{error}</p>}

                <div style={styles.inputContainer}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputContainer}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
                        Password
                    </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <div
                        style={styles.passwordIcon}
                        onClick={togglePasswordVisibility}
                        title="Toggle Password Visibility"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                </div>

                <button
                    type="submit"
                    style={styles.button}
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>

                {isLoading && <p style={styles.loadingText}>Please wait...</p>}

                <div style={styles.signUpText}>
                    <span>Don't have an account? </span>
                    <span 
                        style={styles.signUpLink} 
                        onClick={() => navigate('/register')} // Navigate to the registration page
                    >
                        Sign up
                    </span>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
