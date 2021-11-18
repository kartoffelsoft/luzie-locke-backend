const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  uid: { type: String, required: true, ref: 'users' },
  items: { type: [ mongoose.Types.ObjectId ], ref: 'items' } //[ { type: mongoose.Schema.Types.ObjectId, ref: 'items' } ],
});

module.exports = mongoose.model('listings', listingSchema);