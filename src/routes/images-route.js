const express                 = require('express')
const auth                    = require('../middleware/auth.js')
const imagesController      = require('../controllers/images')
const { makeExpressCallback } = require('../utils/express-callback')

const router = express.Router()

router.get('/users/:id', auth, makeExpressCallback(imagesController.getUserImage))
router.get('/items/:id', auth, makeExpressCallback(imagesController.getItemImage))

module.exports = router
