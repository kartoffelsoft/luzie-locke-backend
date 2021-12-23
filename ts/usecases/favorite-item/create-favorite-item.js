module.exports = function makeCreateFavoriteItem({ favoriteItemsDatabase, makeFavoriteItem }) {
  return async function createFavoriteItem ({ user, item } = {}) {
    if (!user || !item) {
      throw new Error('Missing mandatory parameters: user, item')
    }

    // const user = await favoriteItemsDatabase.findById({ id: uid })

    // if(!user) {
    //   throw new RangeError('User not found.')
    // }

    const newData = makeFavoriteItem({ user, item })
       
    return await favoriteItemsDatabase.insert({
      id: newData.getId(),
      user: newData.getUser(),
      item: newData.getItem(),
      createdAt: newData.getCreatedAt(),
    })
  }
}
