require('dotenv').config();

const makeDatabase = require('./database')

;(async function setupDatabase () {
  console.log('Setting up database...')

  const database = await makeDatabase()
  const itemsResult = await database
    .collection('items')
    .createIndexes([
      { key: { location: '2dsphere' }, name: 'location_idx' },
      { key: { title: 'text', description: 'text' }, name: 'text_idx' },
      { key: { modifiedAt: -1 }, name: 'modifiedAt_idx' }
    ])

  console.log(itemsResult)

  const itemsDoneResult = await database
  .collection('items-done')
  .createIndexes([
    { key: { modifiedAt: -1 }, name: 'modifiedAt_idx' }
  ])

  console.log(itemsDoneResult)

  console.log('Database setup complete...')
  process.exit()
})()
