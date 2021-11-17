export default function makeReadItem ({ itemsDatabase }) {
  return async function readUser ({ id } = {}) {
    if (!id) {
      throw new Error('Missing mandatory parameters: id')
    }

    const item = await itemsDatabase.findById({ id })
    return item
  }
}
