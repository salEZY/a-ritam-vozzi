const Vehicle = require("../../models/vehicle-model");

module.exports = async (req, res, next) => {
  let vehicle = await Vehicle.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );

  res.json({ message: "Vehicle updated", vehicle });
};
