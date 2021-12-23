const item = require("../item");

module.exports = function makeDeleteFavoriteItem({ favoriteItemsDatabase }) {
  return async function createFavoriteItem ({ user, item } = {}) {
    if (!user || !item) {
      throw new Error('Missing mandatory parameters: user, item')
    }
     
    return await favoriteItemsDatabase.remove({ user, item });
  }
}
