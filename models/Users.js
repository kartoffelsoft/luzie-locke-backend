const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: { type: String },
  name: { type: String },
  email: { type: String },
  reputation: { type: Number, default: 0 },
  pictureURI: { type: String, default: '' }
});

mongoose.model('users', userSchema);
