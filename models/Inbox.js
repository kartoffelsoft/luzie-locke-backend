const mongoose = require('mongoose');
const { Schema } = mongoose;

const inboxSchema = new Schema({
  user: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },
  friend: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },
  chatId: { type: mongoose.Types.ObjectId, required: true, default: new mongoose.mongo.ObjectId() },
  lastMessage: { type: String, default: '' },
  counts: {
    unseen: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: new Date() }
});

module.exports = mongoose.model('inboxes', inboxSchema);