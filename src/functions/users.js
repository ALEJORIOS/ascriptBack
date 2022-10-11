import { user } from "../schemas.js";
import bcrypt from "bcrypt";

export class Users {
    async createUser(userData) {
        const passHashed = await bcrypt.hash(userData.password, 10);
        const newUser = new user({
            username: userData.username,
            password: passHashed
        })
        return await newUser.save();
    }

    async login(userData) {
        const loginReq = new user();
        loginReq.find({
            username: userData.username
        }, function(err, docs) {
            if (err) {
                console.log(err);
            } else {
                console.log("First function call : ", docs);
            }
        })
    }
}