const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ success: false, message: "Unauthorized" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  } catch (error) {
    console.log("error in authMiddleware", error);
    res.status(500).json({ message: "error in authMiddleware", error });
  }
};

module.exports = authMiddleware;
