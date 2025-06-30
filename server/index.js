import express from 'express'
import { config } from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';

import { connectDB } from './lib/db.js';
import authRouter from './routes/auth.route.js';
import messageRouter from './routes/message.route.js'
import { server, app } from './lib/socket.io.js';

config();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/chat-app";

//Middlewares
app.use(express.json({ limit: '10mb'}));
app.use(express.urlencoded({ extended:true, limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}));

//Routes
app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);

server.listen(PORT, () => {
    connectDB(MONGO_URL);
    console.log(`Server listening on PORT : ${PORT}`);
})