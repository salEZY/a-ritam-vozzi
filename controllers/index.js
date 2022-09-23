const register = require("./register");
const login = require("./login");
const allUsers = require("./allUsers");
const oneUser = require("./oneUser");
const editAccount = require("./editAccount");
const deleteAccount = require("./deleteAccount");

module.exports = {
  register,
  login,
  editAccount,
  deleteAccount,
  oneUser,
  allUsers,
};
