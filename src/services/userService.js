// src/services/userService.js
import axios from 'axios';
import url from '../config/url';
const API_URL = url+'/api/user';

export const getUserProfile = async (userId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/${userId}`, {
            headers: { Authorization: token }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
        return null; // Return null or an appropriate fallback value
    }
};

export const getUserFriendRequests = async (userId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/${userId}/friend-requests`, {
            headers: { Authorization: token }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching friend requests:', error.message);
        return []; // Return an empty array or an appropriate fallback value
    }
};

export const acceptFriendRequest = async (userId, friendId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
            `${API_URL}/accept-request/${userId}/${friendId}`,
            {},
            { headers: { Authorization: token } }
        );
        return response.data;
    } catch (error) {
        console.error('Error accepting friend request:', error.message);
        return null; // Return null or an appropriate fallback value
    }
};

export const getUserFriends = async (userId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/${userId}/friends`, {
            headers: { Authorization: token }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user friends:', error.message);
        return []; // Return an empty array or an appropriate fallback value
    }
};

export const searchUsers = async (username) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/search?username=${username}`, {
            headers: { Authorization: token }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching users:', error.message);
        return []; // Return an empty array or an appropriate fallback value
    }
};

export const sendFriendRequest = async (userId, senderId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
            `${API_URL}/${userId}/send-friend-request/${senderId}`,
            {},
            { headers: { Authorization: token } }
        );
        return response.data;
    } catch (error) {
        console.error('Error sending friend request:', error.message);
        return null; // Return null or an appropriate fallback value
    }
};
