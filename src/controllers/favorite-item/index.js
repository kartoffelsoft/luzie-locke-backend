const favoriteItemUseCases = require('../../usecases/favorite-item')

const makePostFavoriteItem = require('./post-favorite-item.js')
const makeDeleteFavoriteItem = require('./delete-favorite-item.js')
const makeGetFavoriteItemList = require('./get-favorite-item-list.js')
const makeGetFavoriteItemExist = require('./get-favorite-item-exist.js')

const postFavoriteItem  = makePostFavoriteItem({ createFavoriteItem: favoriteItemUseCases.createFavoriteItem })
const deleteFavoriteItem  = makeDeleteFavoriteItem({ deleteFavoriteItem: favoriteItemUseCases.deleteFavoriteItem })
const getFavoriteItemList = makeGetFavoriteItemList({ readFavoriteItemListByUser: favoriteItemUseCases.readFavoriteItemListByUser })
const getFavoriteItemExist = makeGetFavoriteItemExist({ readFavoriteItemExist: favoriteItemUseCases.readFavoriteItemExist })

module.exports = Object.freeze({
  postFavoriteItem,
  deleteFavoriteItem,
  getFavoriteItemList,
  getFavoriteItemExist
})
