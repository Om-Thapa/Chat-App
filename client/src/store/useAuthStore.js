import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { axiosInstance } from '../lib/axios.js'

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isLoading: false,
    error: null,

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
            toast.success("Logged out successfully.")
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}))