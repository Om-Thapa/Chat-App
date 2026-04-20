import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://chat-app-teum.onrender.com/api",
    withCredentials: true,
});