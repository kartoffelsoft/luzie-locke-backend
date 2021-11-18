const itemUseCases = require('../../usecases/item')

const makeGetItem = require('./get-item.js')

const getItem = makeGetItem({ readItem: itemUseCases.readItem })
  
module.exports = Object.freeze({
  getItem,
})
