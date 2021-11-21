module.exports = function makeReadItemList ({ itemsDatabase, readUser }) {
  return async function readItemList ({ uid, cursor, limit } = {}) {
    if (!uid || !limit || cursor == null) {
      throw new Error('Missing mandatory parameters: uid, cursor, limit')
    }

    const user = await readUser({ uid })
    if (!user) {
      throw new RangeError('User not found.')
    }

    const itemList = await itemsDatabase.findByCoordinates({ 
      cursor, 
      limit,
      lng: user.location.coordinates[0], 
      lat: user.location.coordinates[1], 
      radius: user.proximity
    })

    return itemList
  }
}
