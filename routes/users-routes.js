const express = require('express');

const usersControllers = require('../controllers/users-controllers')

const router = express.Router();

router.post('/login/google', usersControllers.loginGoogle);
router.post('/login/refresh', usersControllers.refreshAccessToken);
router.patch('/:uid/location', usersControllers.updateLocation);

module.exports = router;
