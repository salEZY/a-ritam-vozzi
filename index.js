require("dotenv").config();
const express = require("express");
const db = require("./util/db");
const routes = require("./routes/index");
const middlewares = require("./util/middlewares");
const Location = require("./models/location-model");
const websocket = require("./util/websocket");
const http = require("http");

const PORT = process.env.PORT || 5070;

const app = express();

app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/index.html");
});

// Middleware
middlewares(app);

// Websocket connection
const server = http.createServer(app);
websocket(server);

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

db();

routes(app);

process.on("RangeError", (err) => {
  console.log(err.message);
});
