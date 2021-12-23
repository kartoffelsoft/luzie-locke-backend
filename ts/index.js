
require('dotenv').config()

const express = require('express')
const http = require('http')
const cors = require('cors')

const { usersRoute, itemsRoute, authRoute, settingsRoute } = require('./routes')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/users', usersRoute)
app.use('/api/items', itemsRoute)
app.use('/api/auth', authRoute)
app.use('/api/settings', settingsRoute)

app.get('/ping', (req, res) => {
  return res.status(200).json('succeed')
});

const server = http.createServer(app)

const PORT = process.env.PORT || 5000

server.listen(PORT)
