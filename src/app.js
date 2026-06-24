
import express from 'express';
import routers from './rotes.js';

const app = express();

app.use(express.json());

// usar o router
app.use(routers);

export default app;
