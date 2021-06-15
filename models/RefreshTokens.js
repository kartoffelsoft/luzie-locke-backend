const mongoose = require('mongoose');
const { Schema } = mongoose;

const refreshTokenSchema = new Schema({
  token: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, required: true, ref: 'users' } 
});

mongoose.model('refreshTokens', refreshTokenSchema);
