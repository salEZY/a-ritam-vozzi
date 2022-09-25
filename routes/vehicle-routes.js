const express = require("express");
const { body, param } = require("express-validator");
const {
  createVehicle,
  getVehicles,
  getVehicle,
  editVehicle,
  deleteVehicle,
} = require("../controllers/vehicle/index");
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

router
  .route("/:id")
  .get(
    param("id").not().isEmpty().withMessage("Vehicle id is required"),
    getVehicle
  )
  .patch(
    param("id").not().isEmpty().withMessage("Vehicle id is required"),
    editVehicle
  )
  .delete(
    param("id").not().isEmpty().withMessage("Vehicle id is required"),
    deleteVehicle
  );

module.exports = router;
