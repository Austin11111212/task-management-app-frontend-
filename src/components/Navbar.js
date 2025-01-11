// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaSun, FaMoon } from 'react-icons/fa';

// const Navbar = () => {
//     const [isDarkMode, setIsDarkMode] = useState(false);

//     const toggleDarkMode = () => {
//         setIsDarkMode(!isDarkMode);
//         document.body.classList.toggle('dark-mode', !isDarkMode);
//     };

//     return (
//         <nav style={styles.navbar}>
//             <button
//                 onClick={toggleDarkMode}
//                 style={styles.darkModeButton}
//             >
//                 {isDarkMode ? <FaSun /> : <FaMoon />}
//             </button>
//             <div style={styles.linksContainer}>
//                 <Link to="/" style={styles.link}>Home</Link>
//                 <Link to="/login" style={styles.link}>Login</Link>
//                 <Link to="/register" style={styles.link}>Register</Link>
//             </div>
//         </nav>
//     );
// };

// const styles = {
//     navbar: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         backgroundColor: '#333',
//         color: '#fff',
//         padding: '10px 20px',
//         position: 'fixed',
//         width: '100%',
//         top: 0,
//         zIndex: 1000,
//     },
//     darkModeButton: {
//         background: 'none',
//         border: 'none',
//         color: '#fff',
//         fontSize: '24px',
//         cursor: 'pointer',
//     },
//     linksContainer: {
//         display: 'flex',
//         gap: '1rem',
//     },
//     link: {
//         color: '#fff',
//         textDecoration: 'none',
//         fontSize: '1rem',
//         fontWeight: 'bold',
//         transition: 'color 0.3s ease',
//     },
// };

// export default Navbar;
