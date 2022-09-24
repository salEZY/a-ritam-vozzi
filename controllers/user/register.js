const { validationResult } = require("express-validator");
const User = require("../../models/user-model");

module.exports = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(403).json({ message: "User already exists." });

  try {
    user = await User.create(req.body);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.json({ message: "User created.", user });
};
