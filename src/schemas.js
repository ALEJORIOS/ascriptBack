import mongoose, { model, Schema } from "mongoose";

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

export const user = mongoose.model('User', User);