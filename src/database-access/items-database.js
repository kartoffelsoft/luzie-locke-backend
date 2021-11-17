import { ObjectId } from 'mongodb'

export default function makeItemsDatabase ({ makeDatabase }) {

  async function findById ({ id: _id }) {
    const database = await makeDatabase()
    const result = await database.collection('items').find({ _id: ObjectId(_id) })

    const found = await result.toArray()

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
