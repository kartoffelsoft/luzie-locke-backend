module.exports = function makeCreateItem({ usersDatabase, itemsDatabase, makeItem }) {
  return async function createItem ({ uid, title, price, description, imageUrls } = {}) {
    if (!uid || !title || !price || !description || !imageUrls) {
      throw new Error('Missing mandatory parameters: uid, title, price, description, imageUrls')
    }

    const user = await usersDatabase.findById({ id: uid })

    if(!user) {
      throw new RangeError('User not found.')
    }

    const newData = makeItem({
      user: user.id,
      title,
      price,
      description,
      imageUrls,
      location: user.location
    });
     
    return await itemsDatabase.insert({
      id: newData.getId(),
      user: newData.getUser(),
      title: newData.getTitle(),
      price: newData.getPrice(),
      description: newData.getDescription(),
      imageUrls: newData.getImageUrls(),
      location: newData.getLocation(),
      state: newData.getState(),
      buyerId: newData.getBuyerId(),
      counts: newData.getCounts(),
      createdAt: newData.getCreatedAt(),
      modifiedAt: newData.getModifiedAt()
    });
  }
}
