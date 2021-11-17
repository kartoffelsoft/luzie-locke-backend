import express from 'express';

import googleLoginController  from '../controllers/google-login/index.js'
import { makeExpressCallback } from '../express-callback/index.js';

const router = express.Router();

router.post('/google', makeExpressCallback(googleLoginController.postLogin));

export default router;
