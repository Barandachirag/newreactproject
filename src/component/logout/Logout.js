import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Signup/AuthContext';  
import { Button } from 'react-bootstrap';
import './Logout.css';  

const Logout = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await logout();
                navigate('/Home');
            } catch (error) {
                console.error('Logout error:', error);
            }
        };

        handleLogout();
    }, [logout, navigate]);

    return (
        <div className="logout">
            <h3>Logging out...</h3>
            <p>Please wait while we log you out.</p>
            
        </div>
    );
};

export default Logout;
