module.exports = function makeReadSoldItemList ({ itemsDatabase }) {
  return async ({ uid, cursor, limit } = {}) => {
    if (!uid || !limit || cursor == null) {
      throw new Error('Missing mandatory parameters: uid, cursor, limit')
    }

    const itemList = await itemsDatabase.findByUser({ 
      user: uid,
      cursor, 
      limit,
      state: 'sold'
    })

    return itemList
  }
}
