module.exports = function makeUpdateLocalLevel ({ usersDatabase, makeUser }) {
  return async ({ uid, data } = {}) => {
    if (!uid || !data ) {
      throw new Error('Missing mandatory parameters: uid, data')
    }

    const existing = await usersDatabase.findById({ id: uid })

    if(!existing) {
      throw new RangeError('User not found.')
    }

    const user = makeUser({ 
      ...existing, 
      ...data
    })

    const updated = await usersDatabase.update({
      id: user.getId(),
      localLevel: user.getLocalLevel()
    })
    
    console.log(updated)
    return { ...existing, ...updated }
  }
}
