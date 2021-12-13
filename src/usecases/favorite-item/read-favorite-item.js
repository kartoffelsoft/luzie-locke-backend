module.exports = function makeReadFavoriteItem({ favoriteItemsDatabase }) {
  return async ({ user, item } = {}) => {
    if(!user || !item) {
      throw new Error('Missing mandatory parameters: user')
    }

    return await favoriteItemsDatabase.findByUserAndItem({ 
      user,
      item
    })
  }
}
