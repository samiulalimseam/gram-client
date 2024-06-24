// src/services/authService.js
import axios from 'axios';
import url from '../config/url';

const API_URL = url+'/api/auth';

export const loginUser = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
};

export const signupUser = async (username, password) => {
    const response = await axios.post(`${API_URL}/signup`, { username, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
};

export const verifyToken = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/verify-token`, {
        headers: { Authorization: token }
    });
    return response.data;
};
