const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("MONGODB_URL", process.env.MONGODB_URL);
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("error in connectDB", error);
  }
};

module.exports = connectDB;
