module.exports = function makeReadItemList ({ itemsDatabase, readUser, localLevelMapper }) {
  return async function readItemList ({ uid, cursor, limit } = {}) {
    if (!uid || !limit || cursor == null) {
      throw new Error('Missing mandatory parameters: uid, cursor, limit')
    }

    const user = await readUser({ id: uid })
    if (!user) {
      throw new RangeError('User not found.')
    }
    
    const itemList = await itemsDatabase.findByCoordinates({ 
      cursor, 
      limit,
      lng: user.location.coordinates[0], 
      lat: user.location.coordinates[1], 
      radius: localLevelMapper.map({ localLevel: user.localLevel })
    })

    return itemList
  }
}
