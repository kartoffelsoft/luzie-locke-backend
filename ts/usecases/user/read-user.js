function makeReadUser ({ usersDatabase }) {
  return async function readUser ({ id } = {}) {
    if (!id) {
      throw new Error('Missing mandatory parameters: id')
    }

    const user = await usersDatabase.findById({ id })
    return user
  }
}

module.exports = makeReadUser
