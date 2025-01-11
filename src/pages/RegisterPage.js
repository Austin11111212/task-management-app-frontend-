import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            navigate('/login'); // Redirect to login page after successful registration
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f9f9f9',
            color: '#333',
            minHeight: '100vh',
        },
        form: {
            maxWidth: '400px',
            width: '100%',
            backgroundColor: '#fff',
            padding: '1.5rem',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        label: {
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: 'bold',
        },
        input: {
            width: '100%',
            padding: '10px',
            marginBottom: '1rem',
            borderRadius: '4px',
            border: '#ccc',
            fontSize: '1rem',
            backgroundColor: '#fff',
            color: '#333',
        },
        button: {
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            marginBottom: '1rem',
        },
        passwordContainer: {
            position: 'relative',
        },
        passwordToggleIcon: {
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            color: '#333',
        },
        error: {
            color: 'red',
            marginBottom: '1rem',
        },
    };

    return (
        <div style={styles.container}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                {error && <p style={styles.error}>{error}</p>}

                <label htmlFor="name" style={styles.label}>Name</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />

                <label htmlFor="email" style={styles.label}>Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />

                <label htmlFor="password" style={styles.label}>Password</label>
                <div style={styles.passwordContainer}>
                    <input
                        id="password"
                        type={passwordVisible ? 'text' : 'password'}
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                    <div style={styles.passwordToggleIcon} onClick={togglePasswordVisibility}>
                        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </div>
                </div>

                <button type="submit" style={styles.button}>
                    Register
                </button>
            </form>

            <div>
                Already have an account?{' '}
                <button
                    style={{ ...styles.button, backgroundColor: 'transparent', color: '#007bff', textDecoration: 'underline' }}
                    onClick={() => navigate('/login')}
                >
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default RegisterPage;
