import bodyParser from "body-parser";
import cors from 'cors';
import * as dotenv from 'dotenv';
import { Users } from "./functions/users.js";
import express from 'express';
import jwt from 'jsonwebtoken';
import { GLOBAL } from "./global.js";


dotenv.config();

let ORIGINS = ['https://ascript.live'];

if (!GLOBAL.PRODUCTION) ORIGINS.push(undefined)

const CORS_OPTIONS = {
    origin: function(origin, callback) {
        if (ORIGINS.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}



export function routes(app) {
    let verifyJWT = express.Router();

    verifyJWT.use((req, res, next) => {
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        if(!token) {
            res.status(401).send({
                code: 4,
                message: "There is no token"
            });
        }else{
            if(token.startsWith("Bearer ")) {
                token = token.slice(7)
            }
            jwt.verify(token, process.env.KEYJWT, (err, decoded) => {
                if(err) {
                    return res.json({
                        code: 5,
                        message: "Invalid Token"
                    })
                }else{
                    req.decoded = decoded;
                    next();
                }
            })
            console.log(token);
        }
    })
    app.use(bodyParser.json());

    app.get('/', cors(CORS_OPTIONS), (req, res) => {
        res.send('Hola mundo!');
    })

    app.post('/new', cors(CORS_OPTIONS), async (req, res) => {
        let newUser = new Users();
        await newUser.createUser(req.body)
        .then(response => res.json(response));
        
    })

    app.post('/login', cors(CORS_OPTIONS), async (req, res) => {
        let usersFunctions = new Users();
        await usersFunctions.login(req.body)
        .then(response => res.json(response));
    })

    app.post('/prueba', [cors(CORS_OPTIONS), verifyJWT], (req, res) => {
        res.send("Probando");
    })

    return app;
}