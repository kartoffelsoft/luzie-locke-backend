import mongoose from 'mongoose';

const refreshTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  user: { type: String, required: true, ref: 'users' },
  createdAt: { type: Date, expires: 7 * 24 * 60 * 60, default: Date.now }
});

const refreshTokenModel = mongoose.model('refreshTokens', refreshTokenSchema);
refreshTokenModel.syncIndexes();

export default refreshTokenModel;
