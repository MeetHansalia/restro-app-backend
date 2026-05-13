const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "food title is required"],
    },
    description: {
      type: String,
      required: [true, "food description is required"],
    },
    foodTags: {
      type: Array,
      required: [true, "food tags are required"],
    },
    foodType: {
      type: String,
      enum: ["veg", "non-veg"],
      required: [true, "food type is required"],
    },
    foodPrice: {
      type: Number,
      required: [true, "food price is required"],
    },
    foodCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "food category is required"],
    },
    foodCode: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    resturantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resturant",
    },
    rattings: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    rattingCount: {
      type: String,
    },
  },
  { timestamps: true },
);

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
