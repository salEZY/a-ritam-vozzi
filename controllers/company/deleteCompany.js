const Company = require("../../models/company-model");

module.exports = async (req, res, next) => {
  let company;
  try {
    company = await Company.findById(req.params.id);
  } catch (err) {
    return res.status(500).json(err.message);
  }
  await company.remove();

  res.json({ message: "Company deleted." });
};
