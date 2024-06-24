// src/utils/api.js
import axios from 'axios';
import url from '../config/url';
export const axiosInstance = axios.create({
    baseURL: url+'/api',
    headers: {
        Authorization: localStorage.getItem('token')
    }
});
