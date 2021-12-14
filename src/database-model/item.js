function buildMakeItem({ idMaker }) {
  return function ({
    id = idMaker.make(),
    user,
    title,
    price,
    description,
    imageUrls,
    location,
    state = 'open',
    buyerId = '',
    counts = { chat: 0, favorite: 0, view: 0 },
    createdAt = Date.now(),
    modifiedAt = createdAt
  } = {}) {
    if(!idMaker.isValid(id)) {
      throw new Error('Item data must have an id.')
    }
    if(!user) {
      throw new Error('Item data must have an owner.')
    }
    if(!title) {
      throw new Error('Item data must have a title.')
    }
    if(!price) {
      throw new Error('Item data must have a price.')
    }
    if(!description) {
      throw new Error('Item data must have a description.')
    }
    if(!imageUrls) {
      throw new Error('Item data must have at least one image to show.')
    }
    if(!location) {
      throw new Error('Item data must have a location.')
    }

    return Object.freeze({
      getId: () => id,
      getUser: () => user,
      getTitle: () => title,
      getPrice: () => price,
      getDescription: () => description,
      getImageUrls: () => imageUrls,
      getLocation: () => location,
      getState: () => state,
      getBuyerId: () => buyerId,
      getCounts: () => counts,
      getCreatedAt: () => createdAt,
      getModifiedAt: () => modifiedAt
    })
  }
}

module.exports = buildMakeItem
