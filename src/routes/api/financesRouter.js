const express = require("express");
const { financeController } = require("../../controllers");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", financeController.getFinance);
router.post("/", financeController.addFinance);
router.delete("/:financeId", financeController.deleteFinance);
router.get("/balance", financeController.getCurrentBalance);
router.patch("/balance", financeController.updateBalance);

module.exports = router;
