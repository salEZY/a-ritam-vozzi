require("dotenv").config();
const express = require("express");
const db = require("./util/db");
const routes = require("./routes/index");
const middlewares = require("./util/middlewares");
const http = require('http')

const { Server } = require('socket.io')
const Location = require('./models/location-model')



const PORT = process.env.PORT || 8090;

const app = express();

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + "/index.html")
})

// Middleware
middlewares(app);

const server = http.createServer(app)

const io = new Server(server)

io.on('connection', (socket) => {
  console.log('A user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('driver-update', async (driverId) => {

    const location = await Location.find({ driver: driverId })
      .sort({ createdAt: -1 })
      .limit(1);

    io.emit('driver-update', location)
  });
})

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
})

db()

routes(app)


