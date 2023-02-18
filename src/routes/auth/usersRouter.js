const express = require("express");
const { userController } = require("../../controllers");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/logout", authMiddleware, userController.logout);
router.get("/current", authMiddleware, userController.current);

module.exports = router;
