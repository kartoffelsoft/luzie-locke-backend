const userUseCases        = require('../../usecases/user');
const settingsUseCase     = require('../../usecases/settings')
const makeGetLocalLevel   = require('./get-local-level.js')
const makePatchLocalLevel = require('./patch-local-level.js')

const makeGetLocation     = require('./get-location.js')

const getLocalLevel = makeGetLocalLevel({ readUser: userUseCases.readUser })
const patchLocalLevel = makePatchLocalLevel({ updateLocalLevel: settingsUseCase.updateLocalLevel })

const getLocation   = makeGetLocation({ readUser: userUseCases.readUser })
  
module.exports = Object.freeze({
  getLocalLevel,
  patchLocalLevel,

  getLocation
})
