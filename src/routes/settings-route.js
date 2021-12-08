const express                 = require('express')
const auth                    = require('../middleware/auth.js')
const settingsController      = require('../controllers/settings')
const { makeExpressCallback } = require('../utils/express-callback')

const router = express.Router()

router.get('/local-level', auth, makeExpressCallback(settingsController.getLocalLevel))
router.get('/location', auth, makeExpressCallback(settingsController.getLocation))

router.patch('/local-level', auth, makeExpressCallback(settingsController.patchLocalLevel))
router.patch('/location', auth, makeExpressCallback(settingsController.patchLocation))

module.exports = router
