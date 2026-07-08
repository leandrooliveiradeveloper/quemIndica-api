
import express from 'express';
import routers from './rotes.js';
import dotenv from 'dotenv';
import path from 'path';

const app = express();

dotenv.config();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/imagens', express.static(path.join(process.cwd(), 'src/imagens'), {
  setHeaders: (res) => {
    res.set('Cache-Control', 'no-store');
  }
}));

// usar o router
app.use(routers);

export default app;
