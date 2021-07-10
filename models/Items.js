const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
  owner: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },
  title: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [ String ], default: [] }, 
  counts: {
    chat: { type: Number, default: 0 },
    favorite: { type: Number, default: 0 },
    view: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model('items', itemSchema);
