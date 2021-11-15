const mongoose = require('mongoose');
const { Schema } = mongoose;

const listingSchema = new Schema({
  uid: { type: String, required: true, ref: 'users' },
  items: { type: [ mongoose.Types.ObjectId ], ref: 'items' } //[ { type: mongoose.Schema.Types.ObjectId, ref: 'items' } ],
});

module.exports = mongoose.model('listings', listingSchema);