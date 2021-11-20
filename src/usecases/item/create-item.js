module.exports = function makeCreateItem ({ usersDatabase, itemsDatabase, makeItem }) {
  return async function createItem ({ uid, title, price, description, imageUrls } = {}) {
    if (!uid || !title || !price || !description || !imageUrls) {
      throw new Error('Missing mandatory parameters: uid, title, price, description, imageUrls')
    }

    const user = await usersDatabase.findById({ id: uid })

    if(!user) {
      throw new RangeError('User not found.')
    }

    const newItem = makeItem({
      user: user.id,
      title,
      price,
      description,
      imageUrls,
      location: user.location
    });
     
    return await itemsDatabase.insert({
      id: newItem.getId(),
      user: newItem.getUser(),
      title: newItem.getTitle(),
      price: newItem.getPrice(),
      description: newItem.getDescription(),
      imageUrls: newItem.getImageUrls(),
      location: newItem.getLocation(),
      state: newItem.getState(),
      buyer: newItem.getBuyer(),
      counts: newItem.getCounts(),
      createdAt: newItem.getCreatedAt()
    });
  }
}
