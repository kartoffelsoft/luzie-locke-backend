require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const usersRoutes = require('./routes/users-routes');

require('./models/Users');
require('./models/RefreshTokens');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', usersRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
