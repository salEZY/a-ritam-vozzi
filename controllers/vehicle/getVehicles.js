const Vehicle = require("../../models/vehicle-model");

module.exports = async (req, res, next) => {
  const vehicles = await Vehicle.find({});

  res.json(vehicles);
};
