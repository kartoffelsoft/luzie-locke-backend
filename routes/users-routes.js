const express = require('express');

const auth = require("../middleware/auth.js");
const usersControllers = require('../controllers/users-controllers')

const router = express.Router();

router.get('/:id', usersControllers.getUserProfile);
router.post('/login/google', usersControllers.loginGoogle);
router.post('/login/refresh', usersControllers.refreshAccessToken);
router.patch('/location', auth, usersControllers.updateLocation);

module.exports = router;
