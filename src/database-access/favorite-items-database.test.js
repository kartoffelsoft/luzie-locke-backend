const makeDatabase = require('../database')
const makeUsersDatabase = require('./users-database.js')
const makeItemsDatabase = require('./items-database.js')
const makeFavoriteItemsDatabase = require('./favorite-items-database.js')
const { makeFakeUser, makeFakeItem, makeFakeFavoriteItem } = require('../utils/test/fake-models')

describe('favorite-items database', () => {
  let itemsDatabase
  let favoriteItemsDatabase

  beforeEach(async () => {
    usersDatabase = makeUsersDatabase({ makeDatabase })
    itemsDatabase = makeItemsDatabase({ makeDatabase })
    favoriteItemsDatabase = makeFavoriteItemsDatabase({ makeDatabase })

    const database = await makeDatabase()
    await database
      .collection('favorite-items')
      .createIndexes([
        { key: { user: -1 }, name: 'user_idx' },
        { key: { createdAt: -1 }, name: 'createdAt_idx' }
      ])
  })

  it('should insert an favorite item', async () => {
    const favoriteItem = makeFakeFavoriteItem()
    const insertedCount = await favoriteItemsDatabase.insert(favoriteItem)
    expect(insertedCount).toEqual(1)
  })

  it('should find favorite items by user', async () => {
    const user = makeFakeUser()
    const item = makeFakeItem({ user: user.id })
    const favoriteItem = makeFakeFavoriteItem({ user: user.id, item: item.id})

    await usersDatabase.insert(user)
    await itemsDatabase.insert(item)
    await favoriteItemsDatabase.insert(favoriteItem)

    const received = await favoriteItemsDatabase.findByUser({ 
      user: user.id,
      cursor: Number.MAX_VALUE,
      limit: 5
    })

    let expected = [{ 
      id: item.id,
      state: item.state,
      title: item.title,
      price: item.price,
      description: item.description,
      counts: item.counts,
      imageUrls: item.imageUrls,
      createdAt: item.createdAt,
      modifiedAt: item.modifiedAt,
      user: { 
        id: user.id,
        city: user.city,
        imageUrl: user.imageUrl
      }
    }]

    expect(received).toEqual(expected)
  })

  it('should remove an favorite item', async () => {
    const favoriteItem = makeFakeFavoriteItem()
    await favoriteItemsDatabase.insert(favoriteItem)
    let removedCount = await favoriteItemsDatabase.remove({ user: favoriteItem.user, item: favoriteItem.item })
    expect(removedCount).toEqual(1)
  })

})
