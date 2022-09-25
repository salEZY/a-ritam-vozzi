const Vehicle = require("../../models/vehicle-model");

module.exports = async (req, res, next) => {
  await Vehicle.findByIdAndRemove(req.params.id);

  res.json({ message: "Vehicle deleted." });
};
