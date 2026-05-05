const User = require("../models/user.Model");
const bcrypt = require("bcrypt");

const getUserInfoController = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("-password -_id")
      .lean();
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
    res.status(500).send({ success: false, message: "error in getUserInfo", error });
  }

};

const updateUserController = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const { userName, email, address, phone, password } = req.body;

    if (userName) user.userName = userName;
    if (email) user.email = email;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    if (password) {
      const sameAsCurrent = await bcrypt.compare(password, user.password);
      if (sameAsCurrent) {
        return res.status(400).send({
          success: false,
          message: "New password and old password cannot be the same",
        });
      }
      const saltRounds = 10;
      user.password = await bcrypt.hash(password, saltRounds);
    }
    await user.save();
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.log("error in updateUserController", error);
    res.status(500).send({ success: false, message: "error in updateUser", error });
  }
};

module.exports = { getUserInfoController, updateUserController };
