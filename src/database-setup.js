require('dotenv').config();

const makeDatabase = require('./database')

;(async function setupDatabase () {
  console.log('Setting up database...')

  const database = await makeDatabase()
  const result = await database
    .collection('items')
    .createIndexes([
      { key: { location: '2dsphere' }, name: 'location_idx' }
    ])

  console.log(result)
  console.log('Database setup complete...')
  process.exit()
})()
