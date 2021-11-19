const express = require('express');

const authGoogleController = require('../controllers/auth-google');
const { makeExpressCallback } = require('../utils/express-callback');

const router = express.Router();

router.post('/google', makeExpressCallback(authGoogleController.postAuth));

module.exports = router;
