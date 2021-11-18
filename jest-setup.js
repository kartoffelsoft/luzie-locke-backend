const { MongoMemoryServer } = require('mongodb-memory-server')

module.exports = async () => {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri()

  global.__MONGOD__ = mongod
  process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf('/'))

  console.log("") 
  console.log("MongoDB Memory Server started, ", process.env.MONGO_URI) 
}
