const express = require("express");
const {
  getUserInfoController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteUserController,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

//routes
//get all users
router.get("/getUser", authMiddleware, getUserInfoController);

router.put("/updateUser", authMiddleware, updateUserController);

router.post("/resetPassword", authMiddleware, resetPasswordController);

router.post("/updatePassword", authMiddleware, updatePasswordController);

router.delete("/deleteUser", authMiddleware, deleteUserController);

module.exports = router;
