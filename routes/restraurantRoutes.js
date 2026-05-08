const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { createResturantController } = require("../controllers/restroController");

const router = express.Router();

//routes
//create resturant
router.post("/createResturant", authMiddleware, createResturantController);
// //get resturant by id
// router.get("/getResturantById", authMiddleware, getResturantByIdController);

//update resturant

module.exports = router;
