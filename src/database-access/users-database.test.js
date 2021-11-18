// const makeDatabase = require('../database/index.js');
// const makeUsersDatabase = require('./users-database.js')
// const UsbDriver = require('../UsbDriver');
import makeDatabase from '../database/index.js'
import makeUsersDatabase from './users-database.js'

describe('users database', () => {

  let usersDatabase

  beforeEach(async () => {
    console.log("@@")
    usersDatabase = makeUsersDatabase({ makeDatabase })
  })

  it('finds an user by id', async () => {
    let name = 'hames'
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

    // let usersDatabase = makeUsersDatabase({ makeDatabase })
    await usersDatabase.insert(actual)

    const found = await usersDatabase.findById({ id: actual.id })
    expect(found).toEqual(actual)
    expect(true).toEqual(true)
  })
})
