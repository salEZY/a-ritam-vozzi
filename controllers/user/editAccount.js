const User = require("../../models/user-model");

module.exports = async (req, res, next) => {
  let user = await User.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );

  res.json({ message: "User updated", user });
};
