const idMaker = require('../utils/id-maker')

module.exports = function makeUsersDatabase ({ makeDatabase }) {

  async function insert ({ id: _id = idMaker.make(), ...data }) {
    const database = await makeDatabase()
    const result = await database.collection('users').insertOne({ _id, ...data })
    return { id: result.insertedId, ...data  }
  }

  async function findById({ id: _id }) {
    const database = await makeDatabase()
    const result = await database.collection('users').find({ _id })

    const found = await result.toArray()
    
    if (found.length === 0) {
      return null
    }
    const { _id: id, ...info } = found[0]
    return { id, ...info }
  }

  async function findBySubId({ subId }) {
    const database = await makeDatabase()
    const result = await database.collection('users').find({ subId: subId })

    const found = await result.toArray()
    
    if (found.length === 0) {
      return null
    }
    const { _id: id, ...info } = found[0]
    return { id, ...info }
  }

  async function update({ id: _id, ...data}) {
    const database = await makeDatabase()
    const result = await database
      .collection('users')
      .updateOne({ _id }, { $set: { ...data } })
      return result.modifiedCount > 0 ? { id: _id, ...data } : null
  }

  return Object.freeze({
    insert,
    findById,
    findBySubId,
    update
  })
}
