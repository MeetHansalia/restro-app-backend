const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const restroMiddleware = require("../middleware/restroMiddleware");
const {
  createResturantController,
  getAllResturantController,
  updateResturantController,
  getRestrauntByIdController,
  deleteResturantController,
} = require("../controllers/restroController");

const router = express.Router();

//routes
//create resturant
router.post("/createResturant", authMiddleware, createResturantController);
// //get allresturant data
router.get("/getAllResturant", getAllResturantController);

// Get restraunt by id
router.get("/getRestrauntById/:id", getRestrauntByIdController);
// Update resturant
router.put("/updateResturant", updateResturantController);

//delete resturant
router.delete("/deleteResturant/:id", authMiddleware, restroMiddleware, deleteResturantController);

module.exports = router;
