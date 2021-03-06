module.exports = function makeItemsDatabase ({ makeDatabase }) {

  async function insert({ id: _id = idMaker.make(), ...data }) {
    const database = await makeDatabase()
    const result = await database.collection('items').insertOne({ _id, ...data })
    return { id: result.insertedId, ...data  }
  }

  async function update({ id: _id, ...data }) {
    const database = await makeDatabase()
    const result = await database.collection('items').updateOne({ _id }, { $set: { ...data } })
    return result.modifiedCount
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
          "user.imageUrl": 1,
          "buyerId": 1
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

  async function findByUser({ user, cursor, limit, state = "open" }) {
    const database = await makeDatabase()
    const result = await database.collection('items').aggregate([
      {
        $match: 
        { 
          user,        
          state,
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

  async function findByBuyerId({ buyerId, cursor, limit, state = "open" }) {
    const database = await makeDatabase()
    const result = await database.collection('items').aggregate([
      {
        $match: 
        { 
          buyerId,   
          state,
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

  async function findByCoordinates({ cursor, limit, lng, lat, radius, state = "open" }) {
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
          state,
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

  async function findByKeyword({ keyword, state = "open" }) {
    const database = await makeDatabase()    
    const result = await database.collection('items').aggregate([
      {
        $match: 
        {
          $text: 
          {
            $search: keyword
          },
          state
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

  async function findByKeywordAndCoordinates({ cursor, limit, keyword, lng, lat, radius, state = "open" }) {
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
          state,
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

  async function remove ({ id }) {
    const database = await makeDatabase()
    const result = await database.collection('items').deleteOne({ _id: id })
    return result.deletedCount
  }

  return Object.freeze({
    insert,
    update,
    findById,
    findByUser,
    findByBuyerId,
    findByCoordinates,
    findByKeyword,
    findByKeywordAndCoordinates,
    remove
  })
}
