const express = require("express");
const { userController } = require("../../controllers");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/verify/:verificationToken", userController.verifyEmail);
router.post("/resend", userController.resendEmail);
router.get("/logout", authMiddleware, userController.logout);
router.get("/current", authMiddleware, userController.current);

router.get("/google", userController.googleAuth);
router.get("/google-redirect", userController.googleRedirect);

module.exports = router;
