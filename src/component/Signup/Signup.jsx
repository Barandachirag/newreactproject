import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';  // Make sure the path is correct
import { Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (name && email && password) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                navigate('/login');
            } catch (error) {
                setError(error.message);
            }
        } else {
            setError('All fields are required.');
        }
    };

    return (
        <div className="addUser">
            <h3>Sign Up</h3>
            {error && <p className="error">{error}</p>}
            <form className="addUserForm" onSubmit={handleSubmit}>
                <div className="inputGroup">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        autoComplete="off"
                        placeholder="Enter your name"
                    />
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
                        placeholder="Enter Password"
                    />
                    <button type="submit" className="btn btn-success">
                        Sign Up
                    </button>
                </div>
            </form>
            <div className="login">
                <p>Already have an Account? </p>
                <Link to="/login" className="btn btn-primary">
                    Login
                </Link>
            </div>
        </div>
    );
};

export default Signup;



