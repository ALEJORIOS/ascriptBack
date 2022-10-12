import { userModel } from "../schemas.js";
import bcrypt from "bcrypt";
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

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
        return await userModel.findOne({username: userData.username}).then(async (res) => {
             if(res !== null){
                return await bcrypt.compare(userData.password, res.password).then(response => {
                    if(response){
                        return {
                            code: 0,
                            message: "OK",
                            token: this.setToken()
                        }
                    }else{
                        return {
                            code: 3,
                            message: "Wrong password"
                        }
                    }
                })
             }else{
                return {
                    code: 2,
                    message: "Wrong username or password"
                }
             }
        })
        .catch(err => console.error(err));
    }

    setToken(){
        const payload = {
            check: true
        }
        return jwt.sign(payload, process.env.KEYJWT, {expiresIn: "20000"});
    }

}