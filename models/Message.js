const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  chatId: { type: mongoose.Types.ObjectId, required: true },
  author: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },
  body: { type: String, required: true },
  createdAt: { type: Date, required: true, default: new Date() },
});

module.exports = mongoose.model('messages', messageSchema);
