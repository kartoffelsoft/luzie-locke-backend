import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  uid: { type: String, required: true, ref: 'users' },
  items: { type: [ mongoose.Types.ObjectId ], ref: 'items' } //[ { type: mongoose.Schema.Types.ObjectId, ref: 'items' } ],
});

export default mongoose.model('listings', listingSchema);