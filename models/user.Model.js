const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "userName is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [8, "password must be at least 8 characters long"],
      max_length: [16, "password must be less than 16 characters long"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
    },
    userType: {
      type: String,
      enum: ["admin", "client", "vendor", "driver"],
      default: "client",
      required: [true, "userType is required"],
    },
    profileImage: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    answer:{
      type: String,
      required: [true, "answer is required"],
    }
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
