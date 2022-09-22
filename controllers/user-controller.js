const { validationResult } = require("express-validator");
const { registerService } = require("../services/user-service");

const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = await registerService(req, res);
  res.json({ message: "User created.", user });
};

module.exports = { register };
