const Inbox = require('../models/Inbox');
const Message = require('../models/Message');

const socketIdMap = [];

module.exports = function(io) {
  io.on('connection', (socket) => {
    const uid = socket.handshake.query.uid;
    socketIdMap[uid] = socket.id;
    console.log('New socket connection')
    
    socket.on('send-message', async (message) => {
      console.log("Meesage received");
      const currentDate = new Date();
      try {
        await Inbox.findOneAndUpdate({
          uid: message.author,
          chatId: message.chatId,
        },
        {
          'counts.unseen': 0,
          lastMessage: message.body,
          updatedAt: currentDate,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
      }
    
      try {
        await Inbox.findOneAndUpdate({
          uid: message.nid,
          chatId: message.chatId,
        },
        {
          $inc: { 'counts.unseen': 1 },
          lastMessage: message.body,
          updatedAt: currentDate,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
      }

      try {
        await new Message({
          chatId: message.chatId,
          author: message.author,
          body: message.body, 
          createdAt: message.createdAt
        }).save();
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
      }

      if(socketIdMap[message.nid]) {
        console.log("socket sending to a neighbor");
        io.to(socketIdMap[message.nid]).emit('receive-message', message);
      }
    })
    
    socket.on('disconnect', (message) => {
      console.log(message);

      for (let key in socketIdMap) {
        if(socketIdMap[key] === socket.id) {
          socketIdMap[key] = null;
        }
      }
    })
  });
}