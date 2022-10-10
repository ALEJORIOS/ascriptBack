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
        newUser.createUser(req.body);
        res.send("User created successful");
    })

    app.post('/login', cors(CORS_OPTIONS), (req, res) => {
        let login = new Users();
        login.login(req.body);
        res.send("Login successful");
    })

    return app;
}