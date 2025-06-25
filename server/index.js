import express from 'express'
import { config } from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';

import { connectDB } from './lib/db.js';
import authRouter from './routes/auth.route.js';

config();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/chat-app";
const app = express()

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}));

//Routes
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
    connectDB(MONGO_URL);
    console.log(`Server listeing on PORT : ${PORT}`);
})