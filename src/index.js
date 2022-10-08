import express from 'express';
import { listen } from './deploy.js';
import { routes } from './routes.js';

let app = express();
app = routes(app);
app = listen(app);