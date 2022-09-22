const User = require("../models/user-model");

const registerService = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(403).json({ message: "User already exists." });

  try {
    user = await User.create(req.body);
    return user;
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { registerService };
