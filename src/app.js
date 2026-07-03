
import express from 'express';
import routers from './rotes.js';

const app = express();

app.use(express.json({ limit: '500mb' }));

// aumenta o limite para 10mb (ou mais, se precisar)
// app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));

// usar o router
app.use(routers);

export default app;
