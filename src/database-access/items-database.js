module.exports = function makeItemsDatabase ({ makeDatabase }) {

  async function insert ({ id: _id = idMaker.make(), ...data }) {
    const database = await makeDatabase()
    const result = await database.collection('items').insertOne({ _id, ...data })
    return { id: result.insertedId, ...data  }
  }

  async function findById({ id: _id }) {
    const database = await makeDatabase()
    const result = await database.collection('items').aggregate([
      {
        $match: { _id }
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
          "imageUrls": 1,
          "createdAt": 1,
          "modifiedAt": 1,
          "user._id": 1,
          "user.name": 1,
          "user.city": 1,
          "user.imageUrl": 1
        }
      }
    ])

    const found = await result.toArray()

    if (found.length === 0) {
      return null
    }

    const { _id: iid, user: { _id: uid, ...user} , ...info } = found[0]
    return { id: iid, user: { id: uid, ...user}, ...info }
  }

  async function findByUser({ user, cursor, limit }) {
    const database = await makeDatabase()
    const result = await database.collection('items').aggregate([
      {
        $match: 
        { 
          user,        
          modifiedAt: 
          { 
            $lt: cursor 
          } 
        },
      },
      {
        $sort: { modifiedAt: -1 }
      }, 
      {
        $limit: limit
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
          "imageUrls": 1,
          "createdAt": 1,
          "modifiedAt": 1,
          "user._id": 1,
          "user.city": 1,
          "user.imageUrl": 1
        }
      }
    ])

    return (await result.toArray()).map(({ _id: iid, user: { _id: uid, ...user}, ...found }) => ({
      id: iid,
      user: { id: uid, ...user},
      ...found
    }))
  }

  async function findByCoordinates({ cursor, limit, lng, lat, radius }) {
    const database = await makeDatabase()
    const result = await database.collection('items').aggregate([
      {
        $match: 
        {
          location: 
          { 
            $geoWithin: 
            {
              $centerSphere: [ [lng, lat], radius / 6378.1 ]
            }
          },
          modifiedAt: 
          { 
            $lt: cursor 
          } 
        }
      },
      {
        $sort: { modifiedAt: -1 }
      }, 
      {
        $limit: limit
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
          "imageUrls": 1,
          "createdAt": 1,
          "modifiedAt": 1,
          "user._id": 1,
          "user.city": 1,
          "user.imageUrl": 1
        }
      }
    ])

    return (await result.toArray()).map(({ _id: iid, user: { _id: uid, ...user}, ...found }) => ({
      id: iid,
      user: { id: uid, ...user},
      ...found
    }))
  }

  async function findByKeyword({ keyword }) {
    const database = await makeDatabase()    
    const result = await database.collection('items').aggregate([
      {
        $match: 
        {
          $text: 
          {
            $search: keyword
          }
        }
      },
      {
        $lookup: 
        {
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
          "imageUrls": 1,
          "createdAt": 1,
          "modifiedAt": 1,
          "user._id": 1,
          "user.city": 1,
          "user.imageUrl": 1
        }
      }
    ])

    return (await result.toArray()).map(({ _id: iid, user: { _id: uid, ...user}, ...found }) => ({
      id: iid,
      user: { id: uid, ...user},
      ...found
    }))
  }

  async function findByKeywordAndCoordinates({ cursor, limit, keyword, lng, lat, radius }) {
    const database = await makeDatabase()
    const result = await database.collection('items').aggregate([
      {
        $match: 
        {
          $text: 
          {
            $search: keyword
          },
          location: 
          { 
            $geoWithin: 
            {
              $centerSphere: [ [lng, lat], radius / 6378.1 ]
            }
          },
          modifiedAt: 
          { 
            $lt: cursor 
          } 
        }
      },
      {
        $sort: { modifiedAt: -1 }
      }, 
      {
        $limit: limit
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
          "imageUrls": 1,
          "createdAt": 1,
          "modifiedAt": 1,
          "user._id": 1,
          "user.city": 1,
          "user.imageUrl": 1
        }
      }
    ])

    return (await result.toArray()).map(({ _id: iid, user: { _id: uid, ...user}, ...found }) => ({
      id: iid,
      user: { id: uid, ...user},
      ...found
    }))
  }

  return Object.freeze({
    insert,
    findById,
    findByUser,
    findByCoordinates,
    findByKeyword,
    findByKeywordAndCoordinates
  })
}
