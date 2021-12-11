const userUseCases      = require('../../usecases/user')
const makeGetUser       = require('./get-user.js')
const makeGetUserImage  = require('./get-user-image.js')

const getUser           = makeGetUser({ readUser: userUseCases.readUser })  
const getUserImage      = makeGetUserImage({ readUser: userUseCases.readUser })

module.exports = Object.freeze({
  getUser,
  getUserImage
})
