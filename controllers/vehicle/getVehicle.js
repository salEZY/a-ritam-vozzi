const Vehicle = require("../../models/vehicle-model");

module.exports = async (req, res, next) => {
  const vehicle = await Vehicle.findById(req.params.id);
  if (!vehicle) return res.status(404).json({ message: "Vehicle not found." });

  res.json(vehicle);
};
