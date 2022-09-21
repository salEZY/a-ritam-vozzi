const express = require("express");

const PORT = process.env.PORT || 8090;

const app = express();

app.listen(PORT, () => {
  console.log(`VOZZI API started on port: ${PORT}`);
});
