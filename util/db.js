const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("MongoDB Atlas connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
