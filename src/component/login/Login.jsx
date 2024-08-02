// src/component/login/Login.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../component/Signup/AuthContext';
import './login.css';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.email === email && storedUser.password === password) {
            login();
            navigate('/home');
        } else {
            setError('Invalid email or password.');
        }
    };

    return (
        <div className="addUser">
            <h3>Sign in</h3>
            {error && <p className="error">{error}</p>}
            <form className="addUserForm" onSubmit={handleSubmit}>
                <div className="inputGroup">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="off"
                        placeholder="Enter your Email"
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="off"
                        placeholder="Enter your Password"
                    />
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </div>
            </form>
            <div className="login">
                <p>Don't have Account? </p>
                <Link to="/signup" className="btn btn-success">
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

export default Login;
