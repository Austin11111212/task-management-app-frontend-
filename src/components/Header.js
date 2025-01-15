import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import icons
import TaskManagerIcon from '../assets/images/I3KMfEQsQgihD17Fiu9q-VJaq5NyLQ-7_PTh-uPm1Qk.webp'; // Import the image

const Header = () => {
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [username, setUsername] = useState('');

    // Fetch the username from localStorage on component mount
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username'); // Clear username on logout
        navigate('/login');
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode', !isDarkMode); // Toggle the dark mode class
    };

    const styles = {
        header: {
            backgroundColor: isDarkMode ? '#333' : '#f9f9f9',
            color: isDarkMode ? '#fff' : '#000',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'Arial, sans-serif',
            position: 'fixed',
            width: '92%',
            top: 0,
            zIndex: 1000,
            padding: '1rem 2rem',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        },
        logo: {
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            textDecoration: 'none',
        },
        logoImage: {
            width: '40px',
            height: '40px',
            marginRight: '0.5rem',
        },
        nav: {
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center',
        },
        link: {
            color: isDarkMode ? '#fff' : '#000',
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: 'bold',
            transition: 'color 0.3s ease',
        },
        linkHover: {
            color: '#007bff',
        },
        button: {
            padding: '8px 15px',
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#c82333',
        },
        darkModeButton: {
            background: 'none',
            border: 'none',
            color: isDarkMode ? '#fff' : '#000',
            fontSize: '24px',
            cursor: 'pointer',
        },
        welcomeMessage: {
            fontSize: '1rem',
            color: isDarkMode ? '#fff' : '#000',
            marginRight: '1rem',
        },
    };

    return (
        <header style={styles.header}>
            {/* Task Manager Logo */}
            <Link to="/" style={styles.logo} title="Go to Home Page">
                <img src={TaskManagerIcon} alt="Task Manager Icon" style={styles.logoImage} />
                <span style={{ color: isDarkMode ? '#fff' : '#000', fontWeight: 'bold' }}>
                    Task Manager
                </span>
            </Link>

            {/* Navigation Links */}
            <nav style={styles.nav}>
                <Link
                    to="/"
                    style={styles.link}
                    onMouseOver={(e) => (e.target.style.color = styles.linkHover.color)}
                    onMouseOut={(e) => (e.target.style.color = isDarkMode ? '#fff' : '#000')}
                >
                    {/* Home */}
                </Link>
                {username && (
                    <span style={styles.welcomeMessage}>
                        Welcome, {username}!
                    </span>
                )}
                {localStorage.getItem('token') ? (
                    <button
                        style={styles.button}
                        onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                        onMouseOut={(e) => (e.target.style.backgroundColor = '#dc3545')}
                        onClick={logoutHandler}
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <Link
                            to="/login"
                            style={styles.link}
                            onMouseOver={(e) => (e.target.style.color = styles.linkHover.color)}
                            onMouseOut={(e) => (e.target.style.color = isDarkMode ? '#fff' : '#000')}
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            style={styles.link}
                            onMouseOver={(e) => (e.target.style.color = styles.linkHover.color)}
                            onMouseOut={(e) => (e.target.style.color = isDarkMode ? '#fff' : '#000')}
                        >
                            Register
                        </Link>
                    </>
                )}
                <button
                    onClick={toggleDarkMode}
                    style={styles.darkModeButton}
                    title="Toggle Dark Mode"
                >
                    {isDarkMode ? <FaSun /> : <FaMoon />}
                </button>
            </nav>
        </header>
    );
};

export default Header;
