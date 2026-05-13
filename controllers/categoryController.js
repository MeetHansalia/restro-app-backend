const Category = require("../models/categoryModel");

const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    switch (true) {
      case !title:
        return res
          .status(400)
          .send({ success: false, message: "Title is required" });
    }
    const existingCategory = await Category.findOne({ title });
    if (existingCategory) {
      return res
        .status(400)
        .send({ success: false, message: "Category already exists" });
    }
    const category = await new Category({ title, imageUrl });
    await category.save();
    res.status(201).send({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log("error in createCategoryController", error);
    res.status(500).send({ success: false, message: ` ${error.message}` });
  }
};

const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await Category.find();
    res
      .status(200)
      .send({ success: true, categories, totalLength: categories.length });
  } catch (error) {
    console.log("error in getAllCategoriesController", error);
    res
      .status(500)
      .send({ success: false, message: ` ${error.message}`, error });
  }
};

const getCategoryByIdController = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).send({ success: true, category });
  } catch (error) {
    console.log("error in getCategoryByIdController", error);
    res
      .status(500)
      .send({ success: false, message: ` ${error.message}`, error });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res
        .status(404)
        .send({ success: false, message: "Category not found" });
    }
    const { title, imageUrl } = req.body;
    switch (true) {
      case !title:
        return res
          .status(400)
          .send({ success: false, message: "Title is required" });
    }
    if (title) category.title = title;
    if (imageUrl) category.imageUrl = imageUrl;
    await category.save();
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log("error in updateCategoryController", error);
    res
      .status(500)
      .send({ success: false, message: ` ${error.message}`, error });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .send({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.log("error in deleteCategoryController", error);
    res
      .status(500)
      .send({ success: false, message: ` ${error.message}`, error });
  }
};

module.exports = {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
};
