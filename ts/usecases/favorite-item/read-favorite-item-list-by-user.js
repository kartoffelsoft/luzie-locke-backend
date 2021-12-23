module.exports = function makeReadFavoriteItemListByUser({ favoriteItemsDatabase }) {
  return async function readFavoriteItemListByUser ({ user, cursor, limit } = {}) {
    if (!user || !limit || cursor == null) {
      throw new Error('Missing mandatory parameters: user, cursor, limit')
    }

    const favoriteItemList = await favoriteItemsDatabase.findByUser({ 
      user,
      cursor, 
      limit
    })

    return favoriteItemList
  }
}
