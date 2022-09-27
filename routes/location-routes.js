const express = require("express");
const { body } = require("express-validator");
const {
  moveDriver,
  getDriversLastLocation,
} = require("../controllers/location/index");
const { authCheck } = require("../util/auth");

const router = express.Router();

router.use(authCheck);

router
  .route("/")
  .get(getDriversLastLocation)
  .post(
    body("vehicle").not().isEmpty().withMessage("Vehicle is required."),
    body("location").not().isEmpty().withMessage("location is required."),
    moveDriver
  );

module.exports = router;
