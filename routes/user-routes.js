const express = require("express");
const { body } = require("express-validator");
const { register, login } = require("../controllers/index");

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

module.exports = router;
