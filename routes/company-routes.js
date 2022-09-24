const express = require("express");
const { body } = require("express-validator");
const { createCompany, getCompanies } = require("../controllers/company/index");

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

module.exports = router;
