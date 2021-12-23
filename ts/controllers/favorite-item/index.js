const favoriteItemUseCases    = require('../../usecases/favorite-item')

const makeGetFavoriteItem     = require('./get-favorite-item.js')
const makeGetFavoriteItemList = require('./get-favorite-item-list.js')
const makePostFavoriteItem    = require('./post-favorite-item.js')
const makeDeleteFavoriteItem  = require('./delete-favorite-item.js')

const getFavoriteItem         = makeGetFavoriteItem({ readFavoriteItem: favoriteItemUseCases.readFavoriteItem })
const getFavoriteItemList     = makeGetFavoriteItemList({ readFavoriteItemListByUser: favoriteItemUseCases.readFavoriteItemListByUser })
const postFavoriteItem        = makePostFavoriteItem({ createFavoriteItem: favoriteItemUseCases.createFavoriteItem })
const deleteFavoriteItem      = makeDeleteFavoriteItem({ deleteFavoriteItem: favoriteItemUseCases.deleteFavoriteItem })

module.exports = Object.freeze({
  getFavoriteItem,
  getFavoriteItemList,
  postFavoriteItem,
  deleteFavoriteItem
})
