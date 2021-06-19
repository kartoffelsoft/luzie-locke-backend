const axios = require('axios');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const loginGoogle = async (req, res) => {
  const { token } = req.body;
  const { data } = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);

  const User = mongoose.model('users');
  const RefreshToken = mongoose.model('refreshTokens');

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
    return res.status(500).json({ message: error });
  }

  res.status(200).json({ profile, accessToken, refreshToken });
};

const refreshAccessToken = async (req, res) => {
  const { token } = req.body;
  const RefreshToken = mongoose.model('refreshTokens');

  let exist;

  try {
    exist = await RefreshToken.findOne({ token: token }).populate('user');
  } catch (error) {
    return res.status(500).json({ message: error });
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
  const User = mongoose.model('users');

  let profile;

  try {
    profile = await User.findOne({ _id: req.uid });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }

  if (!profile) {
    console.log('User not found');
    return res.status(500).json({ message: 'User not found' });
  }

  profile.location.name = name;
  profile.location.geoJSON.coordinates = [ lat, lng ];

  try {
    await profile.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }

  res.status(200).json({ profile });
};

exports.loginGoogle = loginGoogle;
exports.refreshAccessToken = refreshAccessToken;
exports.updateLocation = updateLocation;
