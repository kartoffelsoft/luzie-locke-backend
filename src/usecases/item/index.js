const makeCreateItem = require('./create-item.js')
const makeReadItem = require('./read-item.js')
const makeReadItemList = require('./read-item-list.js')

const { usersDatabase, itemsDatabase } = require('../../database-access')
const { makeItem } = require('../../database-model')

const { readUser } = require('../user')

const createItem = makeCreateItem({ usersDatabase, itemsDatabase, makeItem })
const readItem = makeReadItem({ itemsDatabase })
const readItemList = makeReadItemList({ itemsDatabase, readUser })

module.exports = Object.freeze({
  createItem,
  readItem,
  readItemList
})
