const makeDatabase = require('../database')
const makeUsersDatabase = require('./users-database.js')

describe('users database', () => {

  let usersDatabase

  beforeEach(async () => {
    usersDatabase = makeUsersDatabase({ makeDatabase })
  })

  it('finds an user by id', async () => {
    const actual = {     
      id: 'id',
      subId: 'subId',
      name: 'name',
      email: 'email',
      reputation: 1,
      imageUrl: 'imageUrl',
      proximity: 2,
      locationName: 'locationName',
      locationCoordinates: {
        type: 'Point', 
        coordinates: [50, 50]
      }
    }

    await usersDatabase.insert(actual)

    const found = await usersDatabase.findById({ id: actual.id })
    expect(found).toEqual(actual)
    expect(true).toEqual(true)
  })
})
