const { validationResult } = require("express-validator");
const Vehicle = require("../../models/vehicle-model");

module.exports = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let vehicle = await Vehicle.findOne({ vinNumber: req.body.vinNumber });
  if (vehicle)
    return res.status(403).json({ message: "Vehicle already exists." });

  try {
    vehicle = await Vehicle.create(req.body);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.json({ message: "Vehicle created.", vehicle });
};
