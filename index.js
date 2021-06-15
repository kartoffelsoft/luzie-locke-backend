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

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
