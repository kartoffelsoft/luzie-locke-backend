require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const usersRoutes = require('./routes/users-routes');
const itemsRoutes = require('./routes/items-routes');
const chatRoutes = require('./routes/chat-routes');

require('./models/Users');
require('./models/RefreshTokens');

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
app.use('/api/chat', chatRoutes);

app.get('/ping', (req, res) => {
  return res.status(200).json('succeed');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
