import bodyParser from "body-parser";
import cors from 'cors';
import * as dotenv from 'dotenv';
import { Users } from "./functions/users.js";
import express from 'express';
import { GLOBAL } from "./global.js";
import jwt from "jsonwebtoken";


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

const router = express.Router();

router.use((req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if(GLOBAL.ROUTES_WITHOUT_JWT.includes(req.path)){
        next();
    }else{
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
        }
    }
})

export function applyCORS(app){
    app.use(cors(CORS_OPTIONS));
    return app;
}

router.use(bodyParser.json());

router.get('/', cors(CORS_OPTIONS), (req, res) => {
    res.send('Hola mundo!');
})

router.post('/register', cors(CORS_OPTIONS), async (req, res) => {
    let newUser = new Users();
    await newUser.createUser(req.body)
    .then(response => res.json(response));
    
})

router.post('/login', cors(CORS_OPTIONS), async (req, res) => {
    let usersFunctions = new Users();
    await usersFunctions.login(req.body)
    .then(response => res.json(response));
})

router.post('/prueba', (req, res) => {
    res.send("Probando");
})

export const Router = router;
