// src/routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import ErrorPage from './pages/ErrorPage';

const RoutesConfig = () => {
    return (
        <Routes  >
            <Route  path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
};

export default RoutesConfig;
