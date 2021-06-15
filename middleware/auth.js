import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    let decodeData;

    if(token) {
      decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

    } else {
      decodedData = jwt.decode(token);
    }

  } catch (error) {
    console.log(error);
  }
}