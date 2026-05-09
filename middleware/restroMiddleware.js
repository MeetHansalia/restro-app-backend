const User = require("../models/user.Model");

const restroMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }
    if (user.userType !== "admin") {
      return res.status(403).send({
        success: false,
        message: "Access denied. Only admins can delete a restaurant.",
      });
    }
    next();
  } catch (error) {
    console.log("error in restroMiddleware", error);
    res.status(500).json({ message: "error in restroMiddleware", error });
  }
};

module.exports = restroMiddleware;
