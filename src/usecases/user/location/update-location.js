module.exports = function makeUpdateLocation ({ usersDatabase, makeUser }) {
  return async function updateLocation ({ id, name, lat, lng } = {}) {
    if (!id || !name || !lat || !lng) {
      throw new Error('Missing mandatory parameters: id, name, lat, lng')
    }

    const existing = await usersDatabase.findById({ id })

    if(!existing) {
      throw new RangeError('Comment not found.')
    }

    const user = makeUser({ 
      ...existing, 
      locationName: name, 
      locationCoordinates: {
        type: 'Point',
        coordinates: [lat, lng]
      }
    })

    const updated = await usersDatabase.update({
      id: user.getId(),
      locationName: user.getLocatioName(),
      locationCoordinates: user.getLocationCoordinates()
    })
    
    return { ...existing, ...updated }
  }
}
