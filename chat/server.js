const socketIdMap = [];

module.exports = function(io) {
  io.on('connection', (socket) => {
    const uid = socket.handshake.query.uid;
    socketIdMap[uid] = socket.id;
    console.log('New socket connection')
    
    socket.on('send-message', (message) => {
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