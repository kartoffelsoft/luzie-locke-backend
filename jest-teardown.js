module.exports = async () => {
  await global.__MONGOD__.stop()
  console.log("MongoDB Memory Server stopped.")
}
