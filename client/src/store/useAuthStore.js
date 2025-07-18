import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { axiosInstance } from '../lib/axios.js'
import { io } from 'socket.io-client';

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isLoading: false,
    error: null,
    isUpdatingProfile: false,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');
            
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in checkAuth : ",error);
            set({ authUser: null  });
        }
    },

    signup: async ( data ) => {
        set({ isLoading: true, error:null });

        try {
            const res = await axiosInstance.post('/auth/signup', data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
            get().connectSocket();
        } catch (error) {
            console.log("Error in signup : ",error.response.data.message);
            set({ error: error.response.data.message});
            toast.error(error.response.data.message);
        } finally {
            set({ isLoading: false });
        }
    },
    
    login: async ( data ) => {
        set({ isLoading: true, error:null });
        
        try {
            const res = await axiosInstance.post('/auth/login', data);
            set({ authUser: res.data });
            get().connectSocket();
            toast.success("Logged in successfully");
        } catch (error) {
            set({ error: error.response.data.message });
            toast.error(error.response.data.message);
        } finally {
            set({ isLoading: false });
        }
    },

    logout: async() => {
        try {
            const res = await axiosInstance.get("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully.");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put('/auth/update-profile', data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("error in update profile:", error);
            toast.error(error.response.data.message);            
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if(!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query:{
                userId: authUser._id,
                fullname: authUser.fullname
            },
        });
        socket.connect();

        set({ socket: socket });

        socket.on('getOnlineUsers', (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: () => {
        if( get().socket?.connected ) get().socket.disconnect();
    },
}))