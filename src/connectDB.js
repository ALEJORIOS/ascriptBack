import mongoose from "mongoose";
import * as dotenv from 'dotenv';

export default function connectDB() {
    dotenv.config();
    const conn = mongoose.createConnection(process.env.MONGODB_URI).useDb('Ascript');
    return conn;
}