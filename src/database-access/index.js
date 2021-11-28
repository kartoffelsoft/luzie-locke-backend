const makeDatabase = require('../database')
const makeUsersDatabase = require('./users-database.js')
const makeItemsDatabase = require('./items-database.js')
const makeItemsDoneDatabase = require('./items-done-database.js')
const makeFavoriteItemsDatabase = require('./favorite-items-database.js')

let usersDatabase     = makeUsersDatabase({ makeDatabase })
let itemsDatabase     = makeItemsDatabase({ makeDatabase })
let itemsDoneDatabase = makeItemsDoneDatabase({ makeDatabase })
let favoriteItemsDatabase = makeFavoriteItemsDatabase({ makeDatabase })

module.exports = Object.freeze({
  usersDatabase,
  itemsDatabase,
  itemsDoneDatabase,
  favoriteItemsDatabase
})
