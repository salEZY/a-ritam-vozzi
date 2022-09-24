const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    PIB: { type: Number, required: true, unique: true },
    MB: { type: Number, required: true, unique: true },
  },
  { timestamps: true }
);

companySchema.methods.toJSON = function () {
  const company = this.toObject();
  delete company.__v;

  return company;
};

module.exports = Company = mongoose.model("Company", companySchema);
