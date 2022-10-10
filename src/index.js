import express from 'express';
import { listen } from './deploy.js';
import { routes } from './routes.js';
import * as dotenv from 'dotenv';

dotenv.config();

let app = express();
app = routes(app);
app = listen(app);