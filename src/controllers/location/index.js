const locatiuonUseCases = require('../../usecases/user/location')
const makePatchLocation = require('./patch-location.js')

const patchLocation = makePatchLocation({ updateLocation: locatiuonUseCases.updateLocation })
  
module.exports = Object.freeze({
  patchLocation
})
