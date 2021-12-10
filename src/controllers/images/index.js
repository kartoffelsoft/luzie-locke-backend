const userUseCases = require('../../usecases/user')
const itemUseCases = require('../../usecases/item')
const makeGetUserImage = require('./get-user-image.js')
const makeGetItemImage = require('./get-item-image.js')

const getUserImage = makeGetUserImage({ readUser: userUseCases.readUser })
const getItemImage = makeGetItemImage({ readItem: itemUseCases.readItem })
  
module.exports = Object.freeze({
  getUserImage,
  getItemImage
})
