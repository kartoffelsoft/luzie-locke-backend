module.exports = function makeReadOpenItemList ({ itemsDatabase }) {
  return async ({ uid, cursor, limit } = {}) => {
    if (!uid || !limit || cursor == null) {
      throw new Error('Missing mandatory parameters: uid, cursor, limit')
    }

    const itemList = await itemsDatabase.findByUser({ 
      user: uid,
      cursor, 
      limit
    })

    return itemList
  }
}
