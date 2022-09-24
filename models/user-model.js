const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phone: {
      type: Number,
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
    },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.__v;

  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;
  return next();
});

userSchema.methods.comparePassword = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password).catch((e) => false);
};

userSchema.methods.generateToken = function () {
  let secret = process.env.JWT;

  const token = jwt.sign({ _id: this._id, company: this.company }, secret, {
    expiresIn: "1d",
  });

  return token;
};

userSchema.pre(/^find/, function (next) {
  this.populate("company", "name address PIB MB");

  next();
});

module.exports = User = mongoose.model("User", userSchema);
