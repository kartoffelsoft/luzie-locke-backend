module.exports = function makeUpdateItem({ itemsDatabase }) {
  return async function updateItem ({ id, title, price, description, imageUrls } = {}) {
    if (!id || !title || !price || !description || !imageUrls) {
      throw new Error('Missing mandatory parameters: id, title, price, description, imageUrls')
    }

    return await itemsDatabase.update({ 
      id,
      title,
      price,
      description,
      imageUrls,
      modifiedAt: Date.now()
    })
  }
}
