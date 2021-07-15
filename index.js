require('dotenv').config();

const express = require('express');
const http = require('http');
const socketio = require('socket.io');
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
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(express.json());
app.use(cors());

app.use('/api/users', usersRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/chat', chatRoutes);

app.get('/ping', (req, res) => {
  return res.status(200).json('succeed');
});

io.on('connection', (socket) => {
  console.log(socket.id);
  // const id = socket.handshake.query.id;
  // console.log(id);
  // socket.join(id);
  console.log('New WebSocket connection')

  socket.on('send-message', (message, callback) => {
    console.log(message);
    // const user = getUser(socket.id)
    // io.to(user.room).emit('message', generateMessage(user.username, message))
    callback()
  })

  socket.on('disconnect', (message, callback) => {
    console.log("disconnectd!!!")
    console.log(message);
    // const user = getUser(socket.id)
    // io.to(user.room).emit('message', generateMessage(user.username, message))
    // callback()
  })
});

const PORT = process.env.PORT || 5000;
server.listen(PORT);
