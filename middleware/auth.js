const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if(!token) {
      return res.status(401).json({ message: 'Unauthorized.'});
    }

    const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    req.uid = decodedData?._id; 

    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
}

module.exports = auth;
