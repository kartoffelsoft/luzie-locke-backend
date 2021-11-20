const idMaker = require('../utils/id-maker')
const buildMakeUser = require('./user.js')
const buildMakeItem = require('./item.js')

const makeUser = buildMakeUser()
const makeItem = buildMakeItem({ idMaker })

module.exports = Object.freeze({
  makeUser,
  makeItem
})
