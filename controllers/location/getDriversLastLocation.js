const Location = require("../../models/location-model");

module.exports = async (req, res, next) => {
  const locations = await Location.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "driver",
        foreignField: "_id",
        as: "driver",
      },
    },
    {
      $unwind: {
        path: "$driver",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "vehicles",
        localField: "vehicle",
        foreignField: "_id",
        as: "vehicle",
      },
    },
    {
      $unwind: {
        path: "$vehicle",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$createdAt",
        vehicle: { $first: "$vehicle" },
        coordinates: { $first: "$location.coordinates" },
        createdAt: { $first: "$createdAt" },
        driver: { $first: "$driver" },
      },
    },
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: {
          driver: "$driver",
        },
        vehicle: { $first: "$vehicle" },
        coordinates: { $first: "$location.coordinates" },
        createdAt: { $first: "$createdAt" },
      },
    },
  ]);

  res.json(locations);
};
