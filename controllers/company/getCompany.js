const Company = require("../../models/company-model");

module.exports = async (req, res, next) => {
  const company = await Company.findById(req.params.id);
  if (!company) return res.status(404).json({ message: "Company not found." });

  res.json(company);
};
