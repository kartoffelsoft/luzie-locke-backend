module.exports = function makeUpdateLocation ({ usersDatabase, makeUser }) {
  return async function updateLocation ({ uid, data } = {}) {
    if (!uid || !data) {
      throw new Error('Missing mandatory parameters: uid, data')
    }

    const existing = await usersDatabase.findById({ id: uid })

    if(!existing) {
      throw new RangeError('User not found.')
    }

    const user = makeUser({ 
      ...existing, 
      city: data.city, 
      location: data.location
    })

    const updated = await usersDatabase.update({
      id: user.getId(),
      city: user.getCity(),
      location: user.getLocation()
    })
    
    return { ...existing, ...updated }
  }
}
