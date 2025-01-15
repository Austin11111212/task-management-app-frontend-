import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import AddTaskPage from './pages/AddTaskPage';
import Footer from './components/Footer';
// import Navbar from './components/Navbar';

const App = () => {
    return (
        <Router>
            <Header />
            {/* Uncomment Navbar if needed */}
            {/* <Navbar /> */}
            <div style={{ marginTop: '80px', padding: '2rem' }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/add-task" element={<AddTaskPage />} />

                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
