const makeDatabase = require('../database')
const makeUsersDatabase = require('./users-database.js')
const makeItemsDatabase = require('./items-database.js')
const { makeFakeUser, makeFakeItem } = require('../utils/test/fake-models')

describe('users database', () => {
  let usersDatabase
  let itemsDatabase

  beforeEach(async () => {
    usersDatabase = makeUsersDatabase({ makeDatabase })
    itemsDatabase = makeItemsDatabase({ makeDatabase })

    const database = await makeDatabase()
    await database
      .collection('items')
      .createIndexes([
        { key: { title: 'text', description: 'text' }, name: 'text_idx' }
      ])
  })

  it('should insert an item', async () => {
    const item = makeFakeItem()
    const received = await itemsDatabase.insert(item)
    expect(received).toEqual(item)
  })

  it('should find an item by id', async () => {
    const user = makeFakeUser()
    await usersDatabase.insert(user)

    const item = makeFakeItem({ user: user.id })
    await itemsDatabase.insert(item)

    const received = await itemsDatabase.findById({ id: item.id })

    let expected = { 
      id: item.id,
      state: item.state,
      title: item.title,
      price: item.price,
      description: item.description,
      counts: item.counts,
      imageUrls: item.imageUrls,
      createdAt: item.createdAt,
      user: { 
        id: user.id,
        city: user.city,
        imageUrl: user.imageUrl
      }
    }

    expect(received).toEqual(expected)
  })

  it('should find items by radius', async () => {
    const location1 = { type: 'Point', coordinates: [ 10.001, 11.001 ] }
    const location2 = { type: 'Point', coordinates: [ 20.001, 21.001 ] }
    const location3 = { type: 'Point', coordinates: [ 10.021, 11.021 ] }

    const user1 = makeFakeUser({ location: location1 })
    const user2 = makeFakeUser({ location: location2 })
    const user3 = makeFakeUser({ location: location3 })

    await usersDatabase.insert(user1)
    await usersDatabase.insert(user2)
    await usersDatabase.insert(user3)

    const item1 = makeFakeItem({ user: user1.id, location: location1 })
    const item2 = makeFakeItem({ user: user2.id, location: location2 })
    const item3 = makeFakeItem({ user: user3.id, location: location3 })

    await itemsDatabase.insert(item1)
    await itemsDatabase.insert(item2)
    await itemsDatabase.insert(item3)

    const received = await itemsDatabase.findByCoordinates({ lng: 10.011, lat: 11.011, radius: 5 })

    let expected = [{ 
      id: item1.id,
      state: item1.state,
      title: item1.title,
      price: item1.price,
      description: item1.description,
      counts: item1.counts,
      imageUrls: item1.imageUrls,
      createdAt: item1.createdAt,
      user: { 
        id: user1.id,
        city: user1.city,
        imageUrl: user1.imageUrl
      },
    }, { 
      id: item3.id,
      state: item3.state,
      title: item3.title,
      price: item3.price,
      description: item3.description,
      counts: item3.counts,
      imageUrls: item3.imageUrls,
      createdAt: item3.createdAt,
      user: { 
        id: user3.id,
        city: user3.city,
        imageUrl: user3.imageUrl
      }
    }]

    expect(received).toEqual(expected)
  })

  it('should find items by keyword', async () => {
    const user1 = makeFakeUser()
    const user2 = makeFakeUser()

    await usersDatabase.insert(user1)
    await usersDatabase.insert(user2)

    const item1 = makeFakeItem({ user: user1.id, description: 'Lorem ipsum dolor sit amet' })
    const item2 = makeFakeItem({ user: user2.id, description: 'consectetuer adipiscing elit.' })

    await itemsDatabase.insert(item1)
    await itemsDatabase.insert(item2)

    const received = await itemsDatabase.findByKeyword({ keyword: "consectetuer" })

    let expected = [{ 
      id: item2.id,
      state: item2.state,
      title: item2.title,
      price: item2.price,
      description: item2.description,
      counts: item2.counts,
      imageUrls: item2.imageUrls,
      createdAt: item2.createdAt,
      user: { 
        id: user2.id,
        city: user2.city,
        imageUrl: user2.imageUrl
      }
    }]

    expect(received).toEqual(expected)
  })

  it('should find items by radius and keyword', async () => {
    const location1 = { type: 'Point', coordinates: [ 10.001, 11.001 ] }
    const location2 = { type: 'Point', coordinates: [ 20.001, 21.001 ] }
    const location3 = { type: 'Point', coordinates: [ 10.021, 11.021 ] }

    const user1 = makeFakeUser({ location: location1 })
    const user2 = makeFakeUser({ location: location2 })
    const user3 = makeFakeUser({ location: location3 })

    await usersDatabase.insert(user1)
    await usersDatabase.insert(user2)
    await usersDatabase.insert(user3)

    const item1 = makeFakeItem({ user: user1.id, location: location1, description: 'Lorem ipsum dolor sit amet,' })
    const item2 = makeFakeItem({ user: user2.id, location: location2, description: 'consectetuer adipiscing elit.' })
    const item3 = makeFakeItem({ user: user3.id, location: location3, description: 'Aenean commodo ligula eget dolor.' })

    await itemsDatabase.insert(item1)
    await itemsDatabase.insert(item2)
    await itemsDatabase.insert(item3)

    const received = await itemsDatabase.findByKeywordAndCoordinates({ keyword: "consectetuer", lng: 20.011, lat: 21.011, radius: 5 })

    let expected = [{ 
      id: item2.id,
      state: item2.state,
      title: item2.title,
      price: item2.price,
      description: item2.description,
      counts: item2.counts,
      imageUrls: item2.imageUrls,
      createdAt: item2.createdAt,
      user: { 
        id: user2.id,
        city: user2.city,
        imageUrl: user2.imageUrl
      },
    }]

    expect(received).toEqual(expected)
  })
})
