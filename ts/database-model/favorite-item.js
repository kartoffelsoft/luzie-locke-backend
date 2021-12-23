function buildMakeFavoriteItem({ idMaker }) {
  return function ({
    id = idMaker.make(),
    user,
    item,
    createdAt = Date.now(),
  } = {}) {
    if(!idMaker.isValid(id)) {
      throw new Error('FavoriteItem data must have an id.')
    }
    if(!user) {
      throw new Error('FavoriteItem data must have an user id.')
    }
    if(!item) {
      throw new Error('FavoriteItem data must have an item id.')
    }

    return Object.freeze({
      getId: () => id,
      getUser: () => user,
      getItem: () => item,
      getCreatedAt: () => createdAt
    })
  }
}

module.exports = buildMakeFavoriteItem
