
import mongodb from 'mongodb';

let databaseClient;

export default async function makeDatabase() {
  if(databaseClient) {
    console.log("@@22")
    return databaseClient.db()
  }

  try {
    console.log("Opening..", process.env.MONGO_URI)
    databaseClient = await mongodb.MongoClient.connect(process.env.MONGO_URI)
    console.log("OPENPOOE")
  } catch(error) {
    console.log("@@@@")
    throw Error('Error connecting MongoDB.');
  }

  return databaseClient.db()
}
