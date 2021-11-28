module.exports = function makeFavoriteItemsDatabase ({ makeDatabase }) {

  async function insert ({ id: _id = idMaker.make(), ...data }) {
    const database = await makeDatabase()
    const result = await database.collection('favorite-items').updateOne(
      {
        user: data.user, item: data.item 
      },
      {
        $set: { user: data.user, item: data.item, createdAt: data.createdAt },
        $setOnInsert: { _id }
      },
      {
        upsert: true,
        returnDocument: 'after'
      }
    )

    return result.upsertedCount + result.modifiedCount 
    // const result = await database.collection('favorite-items').findOneAndUpdate(
    //   { 
    //     user: data.user, item: data.item 
    //   },
    //   {
    //     $set: { user: data.user, item: data.item, createdAt: data.createdAt },
    //     $setOnInsert: { _id }
    //   },
    //   {
    //     upsert: true,
    //     returnDocument: 'after'
    //   }
    // )

    // if(!result.ok) {
    //   return null
    // } 

    // const { _id: id, ...rest } = result.value
    // return { id, ...rest  }
  }

  async function findByUser({ user, cursor, limit }) {
    const database = await makeDatabase()
    const result = await database.collection('favorite-items').aggregate([
      {
        $match: 
        { 
          user,        
          createdAt: 
          { 
            $lt: cursor 
          } 
        },
      },
      {
        $sort: { createdAt: -1 }
      }, 
      {
        $limit: limit
      },
      {
        $lookup: 
        {
          from: "items",
          let: { item: "$item" },
          pipeline: 
          [
            {
              $match: 
              { 
                $expr: 
                {
                  $eq: [ "$_id", "$$item" ]
                }
              }
            },
            {
              $lookup:
              {
                from: "users",
                let: { user: "$user" },
                pipeline: 
                [
                  {
                    $match: 
                    { 
                      $expr: 
                      {
                        $eq: [ "$_id", "$$user" ]
                      }
                    }
                  }
                ],
                as: "user"
              }
            },
            {
              $unwind: "$user"
            },
          ],
          as: "item"
        }
      },
      {
        $unwind: "$item"
      },
      {
        "$project": {
          "item._id": 1,
          "item.state": 1,
          "item.title": 1,
          "item.price": 1,
          "item.description": 1,
          "item.counts": 1,
          "item.imageUrls": 1,
          "item.createdAt": 1,
          "item.modifiedAt": 1,
          "item.user._id": 1,
          "item.user.city": 1,
          "item.user.imageUrl": 1
        }
      }
    ])

    return (await result.toArray()).map(({ item: { _id: iid, user: { _id: uid, ...user }, ...item } }) => ({
      id: iid,
      user: { id: uid, ...user},
      ...item
    }))
  }

  async function remove ({ user, item }) {
    const database = await makeDatabase()
    const result = await database.collection('favorite-items').deleteOne({ user, item })
    return result.deletedCount
  }

  return Object.freeze({
    insert,
    findByUser,
    remove
  })
}
