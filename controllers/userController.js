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
    res
      .status(500)
      .send({ success: false, message: "error in getUserInfo", error });
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
    res
      .status(500)
      .send({ success: false, message: "error in updateUser", error });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    const requiredFields = { email, answer, newPassword };
    const missingField = Object.entries(requiredFields).find(
      ([, value]) => !value,
    )?.[0];
    if (missingField) {
      return res.status(400).send({
        success: false,
        message: `${missingField} is required`,
      });
    }
    console.log("email", email);
    console.log("answer", answer);
    const user = await User.findOne({ email, answer });
    console.log("user", user);
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found",
      });
    }
    if (user.answer !== answer) {
      return res.status(400).send({
        success: false,
        message: "Answer is incorrect",
      });
    }
    var saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log("error in resetPasswordController", error);
    res
      .status(500)
      .send({ success: false, message: "error in resetPassword", error });
  }
};

const updatePasswordController = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }
    const { newPassword, oldPassword } = req.body;
    const requiredFields = { newPassword, oldPassword };
    const missingField = Object.entries(requiredFields).find(
      ([, value]) => !value,
    )?.[0];
    if (missingField) {
      return res.status(400).send({
        success: false,
        message: `${missingField} is required`,
      });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(404)
        .send({ success: false, message: "Invalid old password" });
    }
    if (oldPassword === newPassword) {
      return res.status(400).send({
        success: false,
        message: "New password and old password cannot be the same",
      });
    }
    var saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedPassword;
    await user.save();
    res
      .status(200)
      .send({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.log("error in updatePasswordController", error);
    res
      .status(500)
      .send({ success: false, message: "error in updatePassword", error });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }
    await user.deleteOne();
    res.status(200).send({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.log("error in deleteUserController", error);
    res
      .status(500)
      .send({ success: false, message: "error in deleteUser", error });
  }
};

module.exports = {
  getUserInfoController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteUserController,
};
