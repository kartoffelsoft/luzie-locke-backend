
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import http from 'http'
import mongoose from 'mongoose'
import cors from 'cors';

import { usersRoutes, itemsRoutes, authRoutes } from './routes/index.js';

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', usersRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/auth', authRoutes);

app.get('/ping', (req, res) => {
  return res.status(200).json('succeed');
});

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

server.listen(PORT);
