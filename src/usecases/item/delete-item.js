module.exports = function makeDeleteItem({ itemsDatabase }) {
  return async ({ id } = {}) => {
    if(!id) {
      throw new Error('Missing mandatory parameters: id')
    }

    return await itemsDatabase.remove({ id })
  }
}
