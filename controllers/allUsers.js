const User = require("../models/user-model");

module.exports = async (req, res) => {
  const users = await User.find({});

  res.json(users);
};
