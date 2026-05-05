const User = require("../models/user.Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const registerController = async (req, res) => {
  try {
    const {
      userName,
      email,
      password,
      address,
      phone,
      userType,
      profileImage,
    } = req.body;
    switch (true) {
      case !userName:
        return res.status(400).json({ message: "userName is required" });
      case !email:
        return res.status(400).json({ message: "email is required" });
      case !password:
        return res.status(400).json({ message: "password is required" });
      case !address:
        return res.status(400).json({ message: "address is required" });
      case !phone:
        return res.status(400).json({ message: "phone is required" });
      case !userType:
        return res.status(400).json({ message: "userType is required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(500).json({ message: "User already exists" });
    }
    // hasshing password
    var saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("hashedPassword", hashedPassword);
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
      userType,
      profileImage,
    });
    res.status(200).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log("error in registerController", error);
    res.status(500).json({ message: "error in register", error });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    switch (true) {
      case !email:
        return res.status(400).json({ message: "email is required" });
      case !password:
        return res.status(40).json({ message: "password is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(404)
        .send({ success: false, message: "Invalid credentials" });
    }

    user.password = undefined;
    return res.status(200).send({
      success: true,
      message: "Login successful",
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.log("error in loginController", error);
    res.status(500).json({ message: "error in login", error });
  }
};

module.exports = { registerController, loginController };
