const favoriteItemUseCases = require('../../usecases/favorite-item')

const makePostFavoriteItem = require('./post-favorite-item.js')
const makeDeleteFavoriteItem = require('./delete-favorite-item.js')
const makeGetFavoriteItemList = require('./get-favorite-item-list.js')

const postFavoriteItem  = makePostFavoriteItem({ createFavoriteItem: favoriteItemUseCases.createFavoriteItem })
const deleteFavoriteItem  = makeDeleteFavoriteItem({ deleteFavoriteItem: favoriteItemUseCases.deleteFavoriteItem })
const getFavoriteItemList = makeGetFavoriteItemList({ readFavoriteItemListByUser: favoriteItemUseCases.readFavoriteItemListByUser })

module.exports = Object.freeze({
  postFavoriteItem,
  deleteFavoriteItem,
  getFavoriteItemList
})
