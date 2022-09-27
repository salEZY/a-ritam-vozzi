const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },

    driver: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    vehicle: {
      type: mongoose.Types.ObjectId,
      ref: "Vehicle",
    },
  },
  { timestamps: true }
);

locationSchema.methods.toJSON = function () {
  const location = this.toObject();
  delete location.__v;

  return location;
};

locationSchema.pre(/^find/, function (next) {
  this.populate("driver", "firstName lastName").populate(
    "vehicle",
    "licencePlateNumber vinNumber manufacturer model"
  );

  next();
});

module.exports = Location = mongoose.model("Location", locationSchema);
