const register = require("./register");
const login = require("./login");
const getUsers = require("./getUsers");
const getUser = require("./getUser");
const editAccount = require("./editAccount");
const deleteAccount = require("./deleteAccount");

module.exports = {
  register,
  login,
  editAccount,
  deleteAccount,
  getUser,
  getUsers,
};
