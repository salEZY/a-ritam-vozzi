const express = require("express");
const { body } = require("express-validator");
const {
  register,
  login,
  allUsers,
  oneUser,
  editAccount,
  deleteAccount,
} = require("../controllers/index");
const { authCheck } = require("../util/auth");

const router = express.Router();

router.post(
  "/register",
  body("email").isEmail().withMessage("You must provide a valid email."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
  register
);

router.post(
  "/login",
  body("email").not().isEmpty().withMessage("Email is required."),
  body("password").not().isEmpty().withMessage("Password is required."),
  login
);

router.use(authCheck);

router.get("/", allUsers);

router.route("/:id").get(oneUser).patch(editAccount).delete(deleteAccount);

module.exports = router;
