// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <Link to="/chat">Chat</Link>
            {user ? (
                <>
                    <Link to="/profile">Profile</Link>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/">Login</Link>
                    <Link to="/signup">Signup</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;
