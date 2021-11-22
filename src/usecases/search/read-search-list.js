module.exports = function makeReadSearchList ({ itemsDatabase, readUser }) {
  return async function readSearchList({ keyword, uid, cursor, limit } = {}) {
    if (!keyword || !uid || !limit || cursor == null) {
      throw new Error('Missing mandatory parameters: q, uid, cursor, limit')
    }

    const user = await readUser({ uid })
    if (!user) {
      throw new RangeError('User not found.')
    }

    const itemList = await itemsDatabase.findByKeywordAndCoordinates({ 
      cursor, 
      limit,
      keyword,
      lng: user.location.coordinates[0], 
      lat: user.location.coordinates[1], 
      radius: user.proximity
    })

    return itemList
  }
}
