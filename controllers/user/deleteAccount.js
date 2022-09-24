const User = require("../../models/user-model");

module.exports = async (req, res, next) => {
  await User.findByIdAndRemove(req.params.id);

  res.json({ message: "User deleted." });
};
