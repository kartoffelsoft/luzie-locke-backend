export default function makeUsersDatabase ({ makeDatabase }) {

  async function findById ({ id: _id }) {
    const database = await makeDatabase()
    const result = await database.collection('users').find({ _id })

    const found = await result.toArray()
    console.log(found)
    if (found.length === 0) {
      return null
    }
    const { _id: id, ...info } = found[0]
    return { id, ...info }
  }

  return Object.freeze({
    findById
  })
}
