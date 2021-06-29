const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
  owner: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  images: { type: [ String ], default: [] },
  like: {
    count: { type: Number, default: 0 },
    users: { type: [ mongoose.Types.ObjectId ], default: [] },
  },
  createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model('items', itemSchema);
