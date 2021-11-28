module.exports = function makeReadFavoriteItemListByUser({ favoriteItemsDatabase }) {
  return async function readFavoriteItemListByUser ({ user, cursor, limit } = {}) {
    if (!uid || !limit || cursor == null) {
      throw new Error('Missing mandatory parameters: uid, cursor, limit')
    }

    const favoriteItemList = await favoriteItemsDatabase.findByUser({ 
      user,
      cursor, 
      limit
    })

    return favoriteItemList
  }
}
