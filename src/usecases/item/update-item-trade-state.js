module.exports = function makeUpdateItemTradeState({ itemsDatabase }) {
  return async ({ id, state, buyer } = {}) => {
    if(!id || !state || buyer == null) {
      throw new Error('Missing mandatory parameters: id, state, buyer')
    }

    const modifiedCount = await itemsDatabase.update({ 
      id,
      state,
      buyer
    })

    if(modifiedCount == 1) {
      const item = await itemsDatabase.findById({ id })
      return item
    }

    return null
  }
}
