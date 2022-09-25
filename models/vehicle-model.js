const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    licencePlateNumber: {
      type: String,
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
      enum: ["unspecified", "petrol", "diesel", "tng", "electric"],
      default: "unspecified",
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
    },
  },
  { timestamps: true }
);

vehicleSchema.methods.toJSON = function () {
  const vehicle = this.toObject();
  delete vehicle.__v;

  return vehicle;
};

module.exports = Vehicle = mongoose.model("Vehicle", vehicleSchema);
