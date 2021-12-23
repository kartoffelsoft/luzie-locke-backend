module.exports = function makeUpdateItemTradeState({ itemsDatabase }) {
  return async ({ id, state, buyerId } = {}) => {
    if(!id || !state || buyerId == null) {
      throw new Error('Missing mandatory parameters: id, state, buyerId')
    }

    const modifiedCount = await itemsDatabase.update({ 
      id,
      state,
      buyerId
    })

    if(modifiedCount == 1) {
      const item = await itemsDatabase.findById({ id })
      return item
    }

    return null
  }
}
