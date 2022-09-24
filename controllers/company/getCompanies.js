const Company = require("../../models/company-model");

module.exports = async (req, res, next) => {
  const companies = await Company.find({});

  res.json(companies);
};
