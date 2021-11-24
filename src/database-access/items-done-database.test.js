const makeDatabase = require('../database')
const makeUsersDatabase = require('./users-database.js')
const makeItemsDoneDatabase = require('./items-done-database.js')
const { makeFakeUser, makeFakeItem } = require('../utils/test/fake-models')

describe('items-done database', () => {
  let usersDatabase
  let itemsDoneDatabase

  beforeEach(async () => {
    usersDatabase = makeUsersDatabase({ makeDatabase })
    itemsDoneDatabase = makeItemsDoneDatabase({ makeDatabase })

    const database = await makeDatabase()
    await database
      .collection('items-done')
      .createIndexes([
        { key: { modifiedAt: -1 }, name: 'modifiedAt_idx' }
      ])
  })

  it('should insert an item', async () => {
    const item = makeFakeItem()
    const received = await itemsDoneDatabase.insert(item)
    expect(received).toEqual(item)
  })

  it('should find an item by id', async () => {
    const user = makeFakeUser()
    await usersDatabase.insert(user)

    const item = makeFakeItem({ user: user.id })
    await itemsDoneDatabase.insert(item)

    const received = await itemsDoneDatabase.findById({ id: item.id })

    let expected = {
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
    }

    expect(received).toEqual(expected)
  })

  it('should find items by user', async () => {
    const user = makeFakeUser()
    await usersDatabase.insert(user)

    const item = makeFakeItem({ user: user.id })
    await itemsDoneDatabase.insert(item)

    const received = await itemsDoneDatabase.findByUser({ 
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

  it('should find items by buyer', async () => {
    const seller = makeFakeUser()
    await usersDatabase.insert(seller)

    const buyer = makeFakeUser()
    await usersDatabase.insert(buyer)

    const item = makeFakeItem({ user: seller.id, buyer: buyer.id })
    await itemsDoneDatabase.insert(item)

    const received = await itemsDoneDatabase.findByBuyer({ 
      buyer: buyer.id,
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
        id: seller.id,
        city: seller.city,
        imageUrl: seller.imageUrl
      }
    }]

    expect(received).toEqual(expected)
  })
})
