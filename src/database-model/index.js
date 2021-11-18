const idMaker = require('../utils/id-maker.js')
const buildMakeUser = require('./user.js')

const makeUser = buildMakeUser({ idMaker })

module.exports = Object.freeze({
  makeUser
})
