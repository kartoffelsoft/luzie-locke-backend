import { ObjectId } from 'mongodb'

export default function makeItemsDatabase ({ makeDatabase }) {

  async function findById({ id: _id }) {
    const database = await makeDatabase()
    const result = await database.collection('items').aggregate([
      {
        $match: { _id: ObjectId(_id) }
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      },
      {
        "$project": {
          "_id": 1,
          "state": 1,
          "title": 1,
          "price": 1,
          "description": 1,
          "counts": 1,
          "images": 1,
          "createdAt": 1,
          "user._id": 1,
          "user.location.name": 1,
          "user.pictureURI": 1,
          "user.location.name": 1
        }
      }
    ])

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
