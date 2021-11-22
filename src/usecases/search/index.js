const makeReadSearchList = require('./read-search-list.js')

const { itemsDatabase } = require('../../database-access')

const { readUser } = require('../user')

const readSearchList = makeReadSearchList({ itemsDatabase, readUser })

module.exports = Object.freeze({
  readSearchList
})
