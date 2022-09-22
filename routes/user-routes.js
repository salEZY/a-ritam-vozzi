const express = require("express");
const { body } = require("express-validator");
const { register } = require("../controllers/user-controller");

const router = express.Router();

router.post(
  "/register",
  body("email").isEmail().withMessage("You must provide a valid email."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
  register
);

module.exports = router;
