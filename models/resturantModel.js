const mongoose = require("mongoose");

const resturantSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    image: {
      type: String,
    },
    food: {
      type: Array,
    },
    time: {
      type: String,
    },
    pickup: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    logoUrl: {
      type: String,
    },
    rattings: {
      type: Number,
      default: 0,
    },
    rattingCount:{
      type: Number,
      default: 0,
    },
    code:{
      type: String,
    },
    coordinates:{
      id:{type:String},
      latitude:{type:Number},
      longitude:{type:Number},
      latitudeDelta:{type:Number},
      longitudeDelta:{type:Number},
      address:{type:String},
      title:{type:String},
    }
  },
  { timestamps: true },
);

const Resturant = mongoose.model("Resturant", resturantSchema);

module.exports = Resturant;
