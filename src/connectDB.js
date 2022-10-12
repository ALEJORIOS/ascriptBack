import mongoose from "mongoose";
import * as dotenv from 'dotenv';
import { GLOBAL } from "./global.js";

export default function connectDB() {
    dotenv.config();
    const conn = mongoose.createConnection(process.env.MONGODB_URI).useDb(GLOBAL.DATABASE);
    return conn;
}