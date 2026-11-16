import 'dotenv/config'
import mongoose from 'mongoose'

let isConnected = false;

export const connectDB = async () => {
    if (isConnected) return; // Skip if already connected

    try {
        console.log("MONGO_URI status:", process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection error", error);
        process.exit(1);
    }
};