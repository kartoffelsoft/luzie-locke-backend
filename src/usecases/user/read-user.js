function makeReadUser ({ usersDatabase }) {
  return async function readUser ({ uid } = {}) {
    if (!id) {
      throw new Error('Missing mandatory parameters: id')
    }

    const user = await usersDatabase.findById({ id: uid})
    return user
  }
}

module.exports = makeReadUser
