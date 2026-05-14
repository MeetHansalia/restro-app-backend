const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    foods: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    orderStatus: {
      type: String,
      enum: ["preparing", "ready to deliver", "delivered", "cancelled"],
      default: "preparing",
    },
    payment: {
      type: Number,
      required: [true, "payment amount is required"],
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
