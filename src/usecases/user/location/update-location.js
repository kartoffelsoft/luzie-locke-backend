module.exports = function makeUpdateLocation ({ usersDatabase, makeUser }) {
  return async function updateLocation ({ uid, city, lng, lat } = {}) {
    if (!uid || !city || !lng || !lat) {
      throw new Error('Missing mandatory parameters: uid, city, lng, lat')
    }

    const existing = await usersDatabase.findById({ id: uid })

    if(!existing) {
      throw new RangeError('User not found.')
    }

    const user = makeUser({ 
      ...existing, 
      city: city, 
      location: {
        type: 'Point',
        coordinates: [lng, lat]
      }
    })

    const updated = await usersDatabase.update({
      id: user.getId(),
      city: user.getCity(),
      location: user.getLocation()
    })
    
    return { ...existing, ...updated }
  }
}
