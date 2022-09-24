const { validationResult } = require("express-validator");
const User = require("../../models/user-model");

module.exports = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(403).json({ message: "Invalid email/password." });

  const isMatch = await user.comparePassword(req.body.password);
  if (!isMatch)
    return res.status(403).json({ message: "Invalid email/password." });

  const token = user.generateToken();

  return res
    .header("Authorization", `Bearer ${token}`)
    .json({ message: "Successful login.", user, token });
};
