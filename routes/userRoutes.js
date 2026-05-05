const express = require("express");
const { getUserInfoController, updateUserController } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

//routes
//get all users
router.get("/getUser", authMiddleware, getUserInfoController);

router.put("/updateUser", authMiddleware, updateUserController);

module.exports = router;
