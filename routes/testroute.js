const express = require("express");
const { getTestUserController } = require("../controllers/testController.js");
const router = express.Router();

router.get("/test-user", getTestUserController);

module.exports = router;
