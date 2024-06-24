// src/services/chatService.js
import axios from 'axios';
import url from '../config/url';

const API_URL = url+'/api/chat';

export const createOrGetChat = async (chatId, userIds) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
            `${API_URL}/${chatId}`,
            { userIds },
            { headers: { Authorization: token } }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating or getting chat:', error.message);
        return null;  // Return null on error
    }
};

export const getChatList = async (userIds) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/${userIds}`, { headers: { Authorization: token } });
        return response.data;
    } catch (error) {
        console.error('Error getting chat list:', error.message);
        return [];  // Return an empty array on error
    }
};

export const sendMessage = async (chatId, senderId, content) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
            `${API_URL}/${chatId}/message`,
            { content, sender: senderId },
            { headers: { Authorization: token } }
        );
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error.message);
        return null;  // Return null on error
    }
};

export const getMessageContent = async (messageIds) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
            `${API_URL}/content`,
            { messageIds },
            { headers: { Authorization: token } }
        );
        return response.data;
    } catch (error) {
        console.error('Error getting message content:', error.message);
        return {};  // Return an empty object on error
    }
};
