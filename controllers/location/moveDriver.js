const Location = require("../../models/location-model");
const Vehicle = require("../../models/vehicle-model");
const { validationResult } = require("express-validator");

module.exports = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const vehicle = await Vehicle.findById(req.body.vehicle);

  if (req.user.company._id.toString() !== vehicle.company._id.toString())
    return res
      .status(403)
      .json({ message: "You must use your company vehicle." });

  let location;
  try {
    location = await Location.create({ ...req.body, driver: req.user._id });
  } catch (err) {
    console.log(err);
  }

  res.json({ message: "Location created.", location });
};
