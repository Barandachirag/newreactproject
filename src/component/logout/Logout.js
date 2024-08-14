// Navbar.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Signup/AuthContext';  
import { Button } from 'react-bootstrap';
//import './Navbar.css';  // Assuming you have CSS for Navbar

const Navbar = () => {
    const { logout, user } = useContext(AuthContext); // Assuming you have user context
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/Login'); // Redirect to Login page after logout
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <nav className="navbar">
            {/* Other Navbar items */}
            {user && (
                <Button onClick={handleLogout} className="logout-btn">
                    Logout
                </Button>
            )}
        </nav>
    );
};

export default Navbar;


