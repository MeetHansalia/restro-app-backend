const Food = require("../models/foodModel");
const Resturant = require("../models/resturantModel");
const Category = require("../models/categoryModel");
const Order = require("../models/orderModel");

const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      foodTags,
      foodType,
      foodPrice,
      foodCategory,
      foodCode,
      isAvailable,
      resturantId,
      rattings,
      rattingCount,
    } = req.body;
    switch (true) {
      case !title:
        return res
          .status(400)
          .send({ success: false, message: "title is required" });
      case !description:
        return res
          .status(400)
          .send({ success: false, message: "description is required" });
      case !foodTags:
        return res
          .status(400)
          .send({ success: false, message: "foodTags is required" });
      case !foodType:
        return res
          .status(400)
          .send({ success: false, message: "foodType is required" });
      case !foodPrice:
        return res
          .status(400)
          .send({ success: false, message: "foodPrice is required" });
      case !foodCategory:
        return res
          .status(400)
          .send({ success: false, message: "foodCategory is required" });
      case !foodCode:
        return res
          .status(400)
          .send({ success: false, message: "foodCode is required" });
      case !isAvailable:
        return res
          .status(400)
          .send({ success: false, message: "isAvailable is required" });
      case !resturantId:
        return res
          .status(400)
          .send({ success: false, message: "resturantId is required" });
    }

    const existingResturant = await Resturant.findById(resturantId);
    if (!existingResturant) {
      return res
        .status(404)
        .send({ success: false, message: "Restaurant not found with this ID" });
    }

    const existingCategory = await Category.findById(foodCategory);
    if (!existingCategory) {
      return res
        .status(404)
        .send({ success: false, message: "Category not found with this ID" });
    }

    const existingFood = await Food.findOne({ title });
    if (existingFood) {
      return res
        .status(400)
        .send({ success: false, message: "Food already exists" });
    }
    const food = new Food({
      title,
      description,
      foodTags,
      foodType,
      foodPrice,
      foodCategory,
      foodCode,
      isAvailable,
      resturantId,
      rattings,
      rattingCount,
    });
    await food.save();
    res
      .status(201)
      .send({ success: true, message: "Food created successfully", food });
  } catch (error) {
    console.log("error in createFoodController", error);
    res.status(500).send({ success: false, message: ` ${error.message}` });
  }
};

const getAllFoodsController = async (req, res) => {
  try {
    const foods = await Food.find({})
      .populate("resturantId")
      .populate("foodCategory");
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log("error in getAllFoodsController", error);
    res.status(500).send({ success: false, message: ` ${error.message}` });
  }
};

const getFoodByIdController = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id)
      .populate("resturantId")
      .populate("foodCategory");
    if (!food) {
      return res
        .status(404)
        .send({ success: false, message: "Food not found" });
    }
    res.status(200).send({ success: true, food });
  } catch (error) {
    console.log("error in getFoodByIdController", error);
    res.status(500).send({ success: false, message: ` ${error.message}` });
  }
};

const getFoodByResturantIdController = async (req, res) => {
  try {
    const foods = await Food.find({ resturantId: req.params.id })
      .populate("resturantId")
      .populate("foodCategory");
    if (!foods.length) {
      return res
        .status(200)
        .send({ success: true, message: "No foods found for this restaurant" });
    }
    res.status(200).send({ success: true, totalFoods: foods.length, foods });
  } catch (error) {
    console.log("error in getFoodByResturantIdController", error);
    res.status(500).send({ success: false, message: ` ${error.message}` });
  }
};

const getFoodByCategoryController = async (req, res) => {
  try {
    const foods = await Food.find({ foodCategory: req.params.id })
      .populate("resturantId")
      .populate("foodCategory");
    if (!foods.length) {
      return res
        .status(404)
        .send({ success: false, message: "No foods found for this category" });
    }
    res.status(200).send({ success: true, totalFoods: foods.length, foods });
  } catch (error) {
    console.log("error in getFoodByCategoryController", error);
    res.status(500).send({ success: false, message: ` ${error.message}` });
  }
};

const updateFoodController = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, {
      new: true,
    });
    if (!food) {
      return res
        .status(404)
        .send({ success: false, message: "Food not found" });
    }
    const {
      title,
      description,
      foodTags,
      foodType,
      foodPrice,
      foodCategory,
      foodCode,
      isAvailable,
      resturantId,
      rattings,
      rattingCount,
    } = req.body;
    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        foodTags,
        foodType,
        foodPrice,
        foodCategory,
        foodCode,
        isAvailable,
        resturantId,
        rattings,
        rattingCount,
      },
      { new: true },
    );
    if (!updatedFood) {
      return res
        .status(404)
        .send({ success: false, message: "Food not found" });
    }
    res
      .status(200)
      .send({ success: true, message: "Food updated successfully", food });
  } catch (error) {
    console.log("error in updateFoodController", error);
    res.status(500).send({ success: false, message: ` ${error.message}` });
  }
};

const deleteFoodController = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .send({ success: true, message: "Food deleted successfully" });
  } catch (error) {
    console.log("error in deleteFoodController", error);
    res.status(500).send({ success: false, message: ` ${error.message}` });
  }
};

// order

const placeOrderController = async (req, res) => {
  try {
    const userId = req.userId;
    const { cart } = req.body;
    if (!cart || !cart.length) {
      return res
        .status(400)
        .send({ success: false, message: "cart is required" });
    }

    const foodIds = cart.map((item) => item._id);
    const foodItems = await Food.find({ _id: { $in: foodIds } });

    if (foodItems.length !== foodIds.length) {
      return res
        .status(404)
        .send({ success: false, message: "One or more food items not found" });
    }

    let totalPrice = 0;
    const foods = cart.map((item) => {
      const quantity = item.quantity || 1;
      const foodData = foodItems.find(
        (f) => f._id.toString() === item._id,
      );
      totalPrice += foodData.foodPrice * quantity;
      return { food: item._id, quantity };
    });

    const newOrder = new Order({
      foods,
      payment: totalPrice,
      buyer: userId,
    });
    await newOrder.save();
    res
      .status(201)
      .send({ success: true, message: "Order placed successfully", newOrder });
  } catch (error) {
    console.log("error in placeOrderController", error);
    res.status(500).send({ success: false, message: ` ${error.message}` });
  }
};
module.exports = {
  createFoodController,
  getAllFoodsController,
  getFoodByIdController,
  getFoodByResturantIdController,
  getFoodByCategoryController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
};
