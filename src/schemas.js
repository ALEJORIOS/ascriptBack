import { Schema } from "mongoose";
import { mongooseObj } from "./connectDB.js";

const User = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export const user = mongooseObj.model('User', User);