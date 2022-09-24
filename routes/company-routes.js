const express = require("express");
const { body, param } = require("express-validator");
const {
  createCompany,
  getCompanies,
  getCompany,
} = require("../controllers/company/index");

const router = express.Router();

router
  .route("/")
  .get(getCompanies)
  .post(
    body("name").not().isEmpty().withMessage("Name is required."),
    body("address").not().isEmpty().withMessage("Address is required."),
    body("PIB").not().isEmpty().withMessage("PIB is required."),
    body("MB").not().isEmpty().withMessage("MB is required."),
    createCompany
  );

router
  .route("/:id")
  .get(
    param("id").not().isEmpty().withMessage("Company id is required"),
    getCompany
  );

module.exports = router;
