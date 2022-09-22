require("dotenv").config();
const express = require("express");
const db = require("./util/db");
const routes = require("./routes/index");

const PORT = process.env.PORT || 8090;

const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`VOZZI API started on port: ${PORT}`);

  db();
  routes(app);
});
