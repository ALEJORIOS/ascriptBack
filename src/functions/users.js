import { userModel } from "../schemas.js";
import bcrypt from "bcrypt";

export class Users {
    async createUser(userData) {
        return await this.checkForExistence(userData.username, userData.email).then(async res => {
            if (!res){
                const passHashed = await bcrypt.hash(userData.password, 10);
                const newUser = new userModel({
                    username: userData.username,
                    password: passHashed,
                    email: userData.email
                });
                return newUser.save().then(res => {
                    return {
                        code: 0,
                        message: "OK"
                    }
                })
            }else{
                return {
                    code: 1,
                    message: "already exist"
                }
            }
        })
    }

    async checkForExistence(username, email){
        return await userModel.findOne({ $or: [ {username}, {email} ]})
        .then(match => {
            return match !== null
        })
        .catch(err => {
            console.error(err);
            return;
        })
    }

    async login(userData) {
        return await userModel.find({username: userData.username});
    }
}