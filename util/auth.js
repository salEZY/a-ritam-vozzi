const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authCheck = async (req, res, next) => {
  if (
    !req.headers?.authorization ||
    !req.headers?.authorization.startsWith("Bearer")
  ) {
    return res.status(401).json({ message: "Forbidden access." });
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token || token === undefined || token === null) {
    return res.status(401).json({ message: "Forbidden access." });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT);

    if (!decodedToken || decodedToken === null || decodedToken === undefined) {
      return res.status(401).json({ message: "Forbidden access." });
    }

    const user = await User.findOne({ _id: decodedToken._id });

    if (!user) {
      return res.status(401).json({ message: "Forbidden access." });
    }

    req.user = {
      _id: decodedToken._id,
      company: decodedToken.company,
    };

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Forbidden access." });
  }
};

module.exports = { authCheck };
