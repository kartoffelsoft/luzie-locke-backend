module.exports = function makeReadFavoriteItemExist({ favoriteItemsDatabase }) {
  return async ({ user, item } = {}) => {
    if(!user || !item) {
      throw new Error('Missing mandatory parameters: user')
    }

    const received = await favoriteItemsDatabase.findByUserAndItem({ 
      user,
      item
    })

    return received ? true : false
  }
}
