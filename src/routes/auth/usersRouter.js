const express = require("express");
const { userController } = require("../../controllers");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", authMiddleware, userController.logout);
router.post("/current", authMiddleware, userController.current);
router.get("/balance", userController.getCurrentBalance);
router.patch("/balance", userController.updateBalance);

module.exports = router;
