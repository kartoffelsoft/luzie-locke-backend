import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  user: { type: String, required: true, ref: 'users' },
  title: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [ String ], default: [] }, 
  counts: {
    chat: { type: Number, default: 0 },
    favorite: { type: Number, default: 0 },
    view: { type: Number, default: 0 },
  },
  state: { type: String, default: 'active' },
  createdAt: { type: Date, default: new Date() },
});

export default mongoose.model('items', itemSchema);
