const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: { type: String },
  googleId: { type: String },
  name: { type: String },
  email: { type: String },
  reputation: { type: Number, default: 0 },
  pictureURI: { type: String, default: '' },
  location: {
    name: { type: String, default: '' },
    geoJSON: {
      type: {
        type: String, 
        enum: ['Point'], 
        default: 'Point'
      },
      coordinates: {
        type: [ Number ],
        default: [ 0, 0 ]
      }
    }
  }
});

module.exports = mongoose.model('users', userSchema);
