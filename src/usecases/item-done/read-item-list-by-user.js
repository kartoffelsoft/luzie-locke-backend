module.exports = function makeReadItemDoneListByUser ({ itemsDoneDatabase }) {
  return async function readItemDoneListByUser ({ uid, cursor, limit } = {}) {
    if (!uid || !limit || cursor == null) {
      throw new Error('Missing mandatory parameters: uid, cursor, limit')
    }

    const itemList = await itemsDoneDatabase.findByUser({ 
      user: uid,
      cursor, 
      limit
    })

    return itemList
  }
}
