import User from '../models/user.model.js';
import Message from '../models/message.model.js';
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from '../lib/socket.io.js';

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedUserId = req.user._id;
        const filteredUsers = await User.find({ _id:{ $ne: loggedUserId }}).select("-password");
        
        setTimeout(()=>{
            res.status(200).json( filteredUsers );
        }, 1000)
    } catch (error) {
        console.log("Error in getUsersForSidebar : ", error.message);
        res.status(500).json({ message: "Internal Server Error"});
    }
};

export const getMessages = async (req, res) => {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    try {
        const messages = await Message.find({
            $or : [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        });

        setTimeout(()=>{
            res.status(200).json(messages);
        }, 500)
    } catch (error) {
        console.log("Error in getMessage controller : ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const sendMessage = async (req, res) => {
    const { id: receiverId } = req.params;
    const { text, image } = req.body;
    const senderId = req.user._id;

    try {
        let imageUrl;
        if (image) {
            // Upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            receiverId,
            senderId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        console.log(receiverSocketId);
        if(receiverSocketId){
            console.log("Emiting new message.")
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        res.status(200).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}