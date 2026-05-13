const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");

const router = express.Router();

//routes
//create category
router.post("/createCategory", authMiddleware, createCategoryController);
//get all categories
router.get("/getAllCategories", getAllCategoriesController);
//get category by id
router.get("/getCategoryById/:id", authMiddleware, getCategoryByIdController);
//update category
router.put("/updateCategory/:id", authMiddleware, updateCategoryController);
//delete category
router.delete("/deleteCategory/:id", authMiddleware, deleteCategoryController);
module.exports = router;
