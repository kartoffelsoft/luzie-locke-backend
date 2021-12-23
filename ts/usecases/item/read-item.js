module.exports = function makeReadItem ({ itemsDatabase }) {
  return async function readItem ({ id } = {}) {
    if (!id) {
      throw new Error('Missing mandatory parameters: id')
    }

    const item = await itemsDatabase.findById({ id })
    return item
  }
}
