const { validationResult } = require("express-validator");
const Company = require("../../models/company-model");

module.exports = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let company = await Company.findOne({ PIB: req.body.PIB });
  if (company)
    return res.status(403).json({ message: "Company already exists." });

  try {
    company = await Company.create(req.body);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.json({ message: "Company created.", company });
};
