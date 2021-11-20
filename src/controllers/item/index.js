const itemUseCases = require('../../usecases/item')

const makeGetItem = require('./get-item.js')
const makePostItem = require('./post-item.js')

const getItem = makeGetItem({ readItem: itemUseCases.readItem })
const postItem = makePostItem({ createItem: itemUseCases.createItem })

module.exports = Object.freeze({
  getItem,
  postItem
})
