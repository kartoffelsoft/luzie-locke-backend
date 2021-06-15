const express = require('express');

const usersControllers = require('../controllers/users-controllers')

const router = express.Router();

router.post('/login/google', usersControllers.loginGoogle);
router.post('/login/refresh', usersControllers.refreshAccessToken);

module.exports = router;
