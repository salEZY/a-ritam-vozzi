const express = require("express");
const { body, param } = require("express-validator");
const { authCheck } = require("../util/auth");
const {
  createCompany,
  getCompanies,
  getCompany,
  editCompany,
  deleteCompany,
} = require("../controllers/company/index");

const router = express.Router();

router.use(authCheck);

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
  )
  .patch(
    param("id").not().isEmpty().withMessage("Company id is required"),
    editCompany
  )
  .delete(
    param("id").not().isEmpty().withMessage("Company id is required"),
    deleteCompany
  );

module.exports = router;
