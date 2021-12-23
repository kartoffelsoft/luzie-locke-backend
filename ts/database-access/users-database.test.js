const makeDatabase = require('../database')
const makeUsersDatabase = require('./users-database.js')
const { makeFakeUser } = require('../utils/test/fake-models')

describe('users database', () => {
  let usersDatabase

  beforeEach(async () => {
    usersDatabase = makeUsersDatabase({ makeDatabase })
  })

  it('should insert an user', async () => {
    const user = makeFakeUser()
    const received = await usersDatabase.insert(user)
    expect(received).toEqual(user)
  })

  it('should find an user by id', async () => {
    const user = makeFakeUser()
    await usersDatabase.insert(user)
    const received = await usersDatabase.findById({ id: user.id })
    expect(received).toEqual(user)
  })

  it('should update an user', async () => {
    const user = makeFakeUser()
    await usersDatabase.insert(user)

    user.locationName = 'Frankfurt'
    const received = await usersDatabase.update(user)
    expect(received).toEqual(user)
  })
})
