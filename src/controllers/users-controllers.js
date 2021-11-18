const axios = require('axios');
const jwt = require('jsonwebtoken');

const { Users, Listings, RefreshTokens } = require('../models')

const loginGoogle = async (req, res) => {
  const { uid, token } = req.body;
  const { data } = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);

  let profile = await Users.findOne({ googleId: data.sub });

  if (!profile) {
    try {
      profile = await new Users({ 
        _id: uid,
        googleId: data.sub, 
        name: data.given_name,
        email: data.email,
        pictureURI: data.picture,
      }).save();

      await new Listing({ 
        uid: uid,
        items: []
      }).save();
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message, data: null });
    }
  }

  const accessToken = jwt.sign(
    { _id: profile._id, googleId: profile.googleId },
    process.env.ACCESS_TOKEN_KEY,
    { expiresIn: '365d' }); //4h

  const refreshToken = jwt.sign(
    { _id: profile._id, googleId: profile.googleId },
    process.env.REFRESH_TOKEN_KEY,
    { expiresIn: '7d' });

  try {
    await new RefreshTokens({ 
      token: refreshToken,
      user: profile._id
    }).save();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message, data: null });
  }

  res.status(200).json({ success: true, message: '', data: { profile, accessToken, refreshToken } });
};

const refreshAccessToken = async (req, res) => {
  const { token } = req.body;

  let exist;
  try {
    exist = await RefreshTokens.findOne({ token: token }).populate('user');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (exist) {
    const accessToken = jwt.sign(
      { _id: exist.user._id, googleId: exist.user.googleId },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: '4h' });

    return res.status(200).json({ success: true, accessToken });
  }
  
  res.status(200).json({ success: false });
};

const updateLocation = async (req, res) => {
  const { name, lat, lng } = req.body;

  let profile;

  try {
    profile = await User.findOne({ _id: req.uid });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }

  if (!profile) {
    return res.status(500).json({ success: false, message: 'User not found' });
  }

  profile.location.name = name;
  profile.location.geoJSON.coordinates = [ lat, lng ];

  try {
    await profile.save();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.status(200).json({ success: true, message: '', data: { profile } });
};

const getUserProfile = async (req, res) => {
  const { id } = req.params;

  let profile;

  try {
    profile = await Users.findOne({ _id: id });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message, data: null });
  }

  if (!profile) {
    return res.status(500).json({ success: false, message:  'User not found', data: null });
  }

  res.status(200).json({ success: true, message: '', data: { profile } });
};

module.exports = Object.freeze({
  loginGoogle,
  refreshAccessToken,
  updateLocation,
  getUserProfile
})
