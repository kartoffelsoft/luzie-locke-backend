module.exports = function makeReadItemDoneListByBuyer ({ itemsDoneDatabase }) {
  return async function readItemDoneListByBuyer ({ uid, cursor, limit } = {}) {
    if (!uid || !limit || cursor == null) {
      throw new Error('Missing mandatory parameters: uid, cursor, limit')
    }

    const itemList = await itemsDoneDatabase.findByBuyer({ 
      buyer: uid,
      cursor, 
      limit
    })

    return itemList
  }
}
