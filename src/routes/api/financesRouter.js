const express = require("express");
const { financeController } = require("../../controllers");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", financeController.getAllFinances);
router.get("/:financeId", financeController.getFinance);
router.post("/", financeController.addFinance);
router.delete("/:financeId", financeController.deleteFinance);
router.put("/:financeId", financeController.editFinance);

module.exports = router;
