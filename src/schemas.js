import { Schema } from "mongoose";
import connectDB from "./connectDB.js";

const User = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

export const userModel = connectDB().model('users', User, "Users");