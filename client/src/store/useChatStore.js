import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,

    //For sidebar
    getUser: async () =>{
        set({ isUserLoading:true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUserLoading: false });
        }
    },

    getMessages: async(userId) => {
        set({ isMessageLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessageLoading: false });
        }
    },

    sendMessage: async(messageData) => {
        const { selectedUser, messages } = get();
        if(!selectedUser) return;
        console.log(messageData)

        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages:[...messages, res.data] });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;
        
        socket.on('newMessage', (newMessage) => {
            console.log("Listening to new messages");
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
            // if(!isMessageSentFromSelectedUser) return;
            
            set({ messages: [...get().messages, newMessage ]});
        });
    },
    
    unsubscribeFromMessage: () => {
        const socket = useAuthStore.getState().socket;
        console.log("Not Listening to new messages")
        socket.off('newMessage');
    }
}))