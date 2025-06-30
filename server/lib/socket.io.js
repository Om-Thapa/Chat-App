import { Server } from 'socket.io';
import Express from 'express';
import http from 'http';

const app = Express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    },
});

//To store online users
let userSocketMap = {};

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

io.on('connection', (socket) => {
    const { userId, fullname } = socket.handshake.query;
    console.log(`User ${fullname} connected : `, socket.id);

    if(userId) userSocketMap[userId] = socket.id;

    io.emit('getOnlineUsers', Object.keys(userSocketMap));
    
    socket.on('disconnect', () => {
        console.log(`User ${fullname} disconnected`);
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});

export { io, app, server };