module.exports = function makeUpdateItem({ itemsDatabase }) {
  return async function updateItem ({ id, ...data } = {}) {
    if (!id) {
      throw new Error('Missing mandatory parameters: id')
    }

    return await itemsDatabase.update({ 
      id,
      modifiedAt: Date.now(),
      ...data
    })
  }
}
