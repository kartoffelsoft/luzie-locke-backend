const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if(token) {
      const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
      req.uid = decodedData?._id;
    } 

    next();
  } catch (error) {
    console.log(error);
  }
}

module.exports = auth;
