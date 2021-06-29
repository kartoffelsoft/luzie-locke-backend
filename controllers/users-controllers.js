const axios = require('axios');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/Users');
const RefreshToken = require('../models/RefreshTokens');

const loginGoogle = async (req, res) => {
  const { token } = req.body;
  const { data } = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);

  let profile = await User.findOne({ googleId: data.sub });

  if (!profile) {
    profile = await new User({ 
      googleId: data.sub, 
      name: data.given_name,
      email: data.email,
      pictureURI: data.picture,
    }).save()
  }
  
  const accessToken = jwt.sign(
    {_id: profile._id, googleId: profile.googleId},
    process.env.ACCESS_TOKEN_KEY,
    { expiresIn: '3h' });

  const refreshToken = jwt.sign(
    {_id: profile._id, googleId: profile.googleId},
    process.env.REFRESH_TOKEN_KEY,
    { expiresIn: '7d' });

  try {
    await new RefreshToken({ 
      token: refreshToken,
      user: profile._id
    }).save();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.status(200).json({ profile, accessToken, refreshToken });
};

const refreshAccessToken = async (req, res) => {
  const { token } = req.body;

  let exist;

  try {
    exist = await RefreshToken.findOne({ token: token }).populate('user');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (exist) {
    const accessToken = jwt.sign(
      { _id: exist._id, googleId: exist.googleId },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: '3h' });

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
    return res.status(500).json({ message: error.message });
  }

  if (!profile) {
    return res.status(500).json({ message: 'User not found' });
  }

  profile.location.name = name;
  profile.location.geoJSON.coordinates = [ lat, lng ];

  try {
    await profile.save();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.status(200).json({ profile });
};

exports.loginGoogle = loginGoogle;
exports.refreshAccessToken = refreshAccessToken;
exports.updateLocation = updateLocation;
