const idMaker = require('../utils/id-maker')
const buildMakeUser = require('./user.js')
const buildMakeItem = require('./item.js')
const buildMakeFavoriteItem = require('./favorite-item.js')

const makeUser = buildMakeUser()
const makeItem = buildMakeItem({ idMaker })
const makeFavoriteItem = buildMakeFavoriteItem({ idMaker })

module.exports = Object.freeze({
  makeUser,
  makeItem,
  makeFavoriteItem
})
