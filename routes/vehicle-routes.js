const express = require("express");
const { body } = require("express-validator");
const { createVehicle, getVehicles } = require("../controllers/vehicle/index");
const { authCheck } = require("../util/auth");

const router = express.Router();

router
  .route("/")
  .get(getVehicles)
  .post(
    body("vinNumber").not().isEmpty().withMessage("Vin Number is required."),
    body("manufacturer")
      .not()
      .isEmpty()
      .withMessage("Car manufacturer is required."),
    body("model").not().isEmpty().withMessage("Car model is required."),
    createVehicle
  );

module.exports = router;
