import mongoose from "mongoose";

export async function connect() {
    await mongoose.connect(process.env.MONGODB_URI)
        .then(res => console.log("Connected to MongoDB Atlas"))
        .catch(err => console.error(err))
}

export let mongooseObj = mongoose;