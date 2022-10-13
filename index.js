import express from 'express';
import { listen } from './src/deploy.js';
import { applyCORS, Router } from './src/routes.js';
import * as dotenv from 'dotenv';
import { GLOBAL } from './src/global.js';

dotenv.config();

let app = express();

// Routes
const ROUTE = GLOBAL.PRODUCTION ? "/api" : "/api-dev"
app = applyCORS(app);
app.use(ROUTE, Router);
app = listen(app);