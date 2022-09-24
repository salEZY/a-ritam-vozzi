const express = require("express");
const { body, param } = require("express-validator");
const {
  register,
  login,
  getUsers,
  getUser,
  editAccount,
  deleteAccount,
} = require("../controllers/user/index");
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

router.get("/", getUsers);

router
  .route("/:id")
  .get(param("id").not().isEmpty().withMessage("User id is required"), getUser)
  .patch(
    param("id").not().isEmpty().withMessage("User id is required"),
    editAccount
  )
  .delete(
    param("id").not().isEmpty().withMessage("User id is required"),
    deleteAccount
  );

module.exports = router;
