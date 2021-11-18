import express from 'express';

import authGoogleController  from '../controllers/auth-google/index.js'
import { makeExpressCallback } from '../utils/express-callback/index.js';

const router = express.Router();

router.post('/google', makeExpressCallback(authGoogleController.postLogin));

export default router;
