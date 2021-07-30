const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  chatId: { type: mongoose.Types.ObjectId, required: true },
  author: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },
  body: { type: String, required: true },
  createdAt: { type: Date, required: true, expires: 7 * 24 * 60 * 60, default: new Date() },
});

const messageModel = mongoose.model('messages', messageSchema);
messageModel.syncIndexes();

module.exports = messageModel;
