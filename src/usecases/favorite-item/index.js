const makeCreateFavoriteItem          = require('./create-favorite-item.js')
const makeReadFavoriteItem            = require('./read-favorite-item.js')
const makeReadFavoriteItemListByUser  = require('./read-favorite-item-list-by-user.js')
const makeDeleteFavoriteItem          = require('./delete-favorite-item.js')

const { favoriteItemsDatabase }       = require('../../database-access')
const { makeFavoriteItem }            = require('../../database-model')

const createFavoriteItem              = makeCreateFavoriteItem({ favoriteItemsDatabase, makeFavoriteItem })
const readFavoriteItem                = makeReadFavoriteItem({ favoriteItemsDatabase })
const readFavoriteItemListByUser      = makeReadFavoriteItemListByUser({ favoriteItemsDatabase })
const deleteFavoriteItem              = makeDeleteFavoriteItem({ favoriteItemsDatabase })

module.exports = Object.freeze({
  createFavoriteItem,
  readFavoriteItem,
  readFavoriteItemListByUser,
  deleteFavoriteItem
})
