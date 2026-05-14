const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createFoodController,
  getAllFoodsController,
  getFoodByIdController,
  getFoodByResturantIdController,
  getFoodByCategoryController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
} = require("../controllers/foodController");

const router = express.Router();

router.post("/createFood", authMiddleware, createFoodController);
router.get("/getAllFoods", getAllFoodsController);
router.get("/getFoodById/:id", getFoodByIdController);
router.get("/getFoodByResturant/:id", getFoodByResturantIdController);
router.get("/getFoodByCategory/:id", getFoodByCategoryController);
router.put("/updateFood/:id", authMiddleware, updateFoodController);
router.delete("/deleteFood/:id", authMiddleware, deleteFoodController);

//order routes
router.post("/placeOrder", authMiddleware, placeOrderController);
// router.get("/getAllOrders", authMiddleware, getAllOrdersController);
// router.get("/getOrderById/:id", authMiddleware, getOrderByIdController);
// router.put("/updateOrder/:id", authMiddleware, updateOrderController);
// router.delete("/deleteOrder/:id", authMiddleware, deleteOrderController);

module.exports = router;
