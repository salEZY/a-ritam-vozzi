const Company = require("../../models/company-model");
const User = require("../../models/user-model");
const Vehicle = require("../../models/vehicle-model");

module.exports = async (req, res, next) => {
  let company;
  try {
    company = await Company.findById(req.params.id);
  } catch (err) {
    return res.status(500).json(err.message);
  }

  // Remove company from all users
  await User.updateMany(
    { company: req.params.id },
    { $unset: { company: null } }
  );

  // Remove company from all vehicles
  await Vehicle.updateMany(
    { company: req.params.id },
    { $unset: { company: null } }
  );

  await company.remove();

  res.json({ message: "Company deleted." });
};
