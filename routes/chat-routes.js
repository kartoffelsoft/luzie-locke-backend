const express = require('express');

const auth = require("../middleware/auth.js");
const chatControllers = require('../controllers/chat-controllers')

const router = express.Router();

router.get('/', auth, chatControllers.getInbox);

router.post('/', auth, chatControllers.createChat);

module.exports = router;
