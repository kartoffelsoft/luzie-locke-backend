const mongoose = require('mongoose');
const { Schema } = mongoose;

const refreshTokenSchema = new Schema({
  token: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },
  createdAt: { type: Date, expires: 7 * 24 * 60 * 60, default: Date.now }
});

mongoose.model('refreshTokens', refreshTokenSchema);
