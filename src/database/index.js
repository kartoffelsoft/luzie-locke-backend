
const mongodb = require('mongodb');

let databaseClient;

module.exports = async function makeDatabase() {
  if(databaseClient) {
    return databaseClient.db()
  }

  try {
    databaseClient = await mongodb.MongoClient.connect(process.env.MONGO_URI)
  } catch(error) {
    throw Error('Error connecting MongoDB.');
  }

  return databaseClient.db()
}
