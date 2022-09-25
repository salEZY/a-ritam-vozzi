const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    licencePlateNumber: {
      type: String,
      required: true,
      unique: true,
    },
    vinNumber: {
      type: String,
      required: true,
      unique: true,
    },
    manufacturer: { type: String, required: true },
    model: {
      type: String,
      required: true,
    },
    engine: {
      type: String,
    },
    fuel: {
      type: String,
      enum: ["petrol", "diesel", "tng", "electric"],
    },
  },
  { timestamps: true }
);

vehicleSchema.methods.toJSON = function () {
  const vehicle = this.toObject();
  delete vehicle.__v;

  return company;
};

module.exports = Vehicle = mongoose.model("Vehicle", vehicleSchema);
