require("dotenv").config();
const express = require("express");
const db = require("./util/db");
const routes = require("./routes/index");
const middlewares = require("./util/middlewares");
const websocket = require("./util/websocket");

const PORT = process.env.PORT || 8090;

const app = express();

// Middleware
middlewares(app);

// Server startup
const server = app.listen(PORT, () => {
  console.log(`VOZZI API started on port: ${PORT}`);

  // Connect to DB
  db();

  // Routes
  routes(app);
});

// Websocket server
websocket(server);
