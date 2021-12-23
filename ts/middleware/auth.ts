import { RequestHandler } from 'express'
import { CustomToken } from '../types'

import jwt from 'jsonwebtoken'

const auth: RequestHandler = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  req.headers.Authorization = req.headers.Authorization ?? ''
  
  try {
    const token = req.headers.authorization!.split(' ')[1];

    if(!token) {
      return res.status(401).json({ message: 'Unauthorized.'});
    }

    const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_KEY as string) as CustomToken;
    req.uid = decodedData?.id; 

    next();
  } catch (error) {
    return res.status(401).json({ message: (error as Error).message });
  }
}

export default auth;
