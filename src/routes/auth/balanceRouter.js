const express = require("express");
const { financeController } = require("../../controllers");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const validation = require("../../middlewares/validationMiddleware");
const wrapper = require("../../utils/wrapper");
const constants = require("../../utils/constants");
const { validateBalanceShema } = require("../../schemas/validation");

const router = express.Router();
const { REQ_VALIDATION_TARGET } = constants;

const balanceValidation = validation(
  validateBalanceShema,
  REQ_VALIDATION_TARGET.BODY
);

router.use(authMiddleware);

router.get("/balance", financeController.getCurrentBalance);
router.patch(
  "/balance",
  wrapper(balanceValidation),
  financeController.updateBalance
);

module.exports = router;
