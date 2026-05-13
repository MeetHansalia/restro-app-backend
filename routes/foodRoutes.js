const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createFoodController,
  getAllFoodsController,
  getFoodByIdController,
  getFoodByResturantIdController,
  getFoodByCategoryController,
} = require("../controllers/foodController");

const router = express.Router();

router.post("/createFood", authMiddleware, createFoodController);
router.get("/getAllFoods", getAllFoodsController);
router.get("/getFoodById/:id", getFoodByIdController);
router.get("/getFoodByResturant/:id", getFoodByResturantIdController);
router.get("/getFoodByCategory/:id", getFoodByCategoryController);

module.exports = router;