import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Signup/AuthContext';  // Ensure this path is correct
import './Logout.css';  // Ensure the CSS file is correctly named and located

const LogoutPage = () => {
    const { isAuthenticated } = useContext(AuthContext); // Get isAuthenticated from AuthContext
    const navigate = useNavigate();

    // const handleLogoutClick = () => {
    //     navigate('/Signup'); // Redirect to Signup page
    // };

    return (
        <div className="logout-container">
            {/* Display message based on authentication status */}
            {isAuthenticated ? (
                <>
                    <p>You are logged in.</p>
                    {/* <button onClick={handleLogoutClick} className="logout-btn">
                        Logout
                    </button> */}
                </>
            ) : (
                <p>You are not logged in.</p>
            )}
        </div>
    );
};

export default LogoutPage;








