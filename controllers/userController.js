const User = require("../models/user.Model");

const getUserInfoController = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.log("error in getUserInfoController", error);
    res.status(500).json({ message: "error in getUserInfo", error });
  }
};

module.exports = { getUserInfoController };
