const Company = require("../../models/company-model");

module.exports = async (req, res, next) => {
  const company = await Company.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );

  res.json({ message: "Company updated", company });
};
