import bodyParser from "body-parser";
import cors from 'cors';
import * as dotenv from 'dotenv';
import { Users } from "./functions/users.js";
dotenv.config();

let ORIGINS = ['https://ascript.live'];

if (process.env.PRODUCTION === "FALSE") ORIGINS.push(undefined)

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
    app.use(bodyParser.json());

    app.get('/', cors(CORS_OPTIONS), (req, res) => {
        res.send('Hola mundo!');
    })

    app.post('/new', cors(CORS_OPTIONS), (req, res) => {
        let newUser = new Users();
        newUser.createUser(req.body)
        .then(response => res.json(response));
        
    })

    app.post('/login', cors(CORS_OPTIONS), (req, res) => {
        let usersFunctions = new Users();
        usersFunctions.checkForExistence(req.body.username, req.body.email).then(match => res.json(match));
    })

    app.post('/prueba', cors(CORS_OPTIONS), async (req, res) => {
        let usersFunctions = new Users();
        let response;
        await usersFunctions.checkForExistence(req.body.username, req.body.email).then(exist => response = exist);
        res.json(response);
    })

    return app;
}