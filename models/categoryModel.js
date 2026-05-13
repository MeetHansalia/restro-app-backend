const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "category title is required"],
  },
  imageUrl: {
    type: String,
    default: "https://via.placeholder.com/150",
  },
  
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
