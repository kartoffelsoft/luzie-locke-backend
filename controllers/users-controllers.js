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

  await new RefreshToken({ 
    token: refreshToken,
    user: profile._id
  }).save();

  res.status(200).json({ profile, accessToken, refreshToken });
};


const refreshAccessToken = async (req, res) => {
  const { token } = req.body;
  const RefreshToken = mongoose.model('refreshTokens');
  const exist = await RefreshToken.findOne({ token: token }).populate('user');

  if (exist) {
    const accessToken = jwt.sign(
      {_id: exist._id, googleId: exist.googleId},
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: '3h' });

    return res.status(200).json({ success: true, accessToken });
  }
  
  res.status(200).json({ success: false });
};

exports.loginGoogle = loginGoogle;
exports.refreshAccessToken = refreshAccessToken;
