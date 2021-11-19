const idMaker = require('../utils/id-maker')
const buildMakeUser = require('./user.js')

const makeUser = buildMakeUser()

module.exports = Object.freeze({
  makeUser
})
