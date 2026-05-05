const express = require("express");
const { getUserInfoController } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

//routes
//get all users
router.get("/getUser", authMiddleware, getUserInfoController);

module.exports = router;
