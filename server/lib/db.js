import mongoose from "mongoose";

export const connectDB = async (db_url) => {
    const conn = mongoose.connect(db_url);
    console.log(`MongoDB connected : ${(await conn).connection.host}`);
}