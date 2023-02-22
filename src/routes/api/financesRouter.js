const express = require("express");
const { financeController } = require("../../controllers");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { validation } = require("../../middlewares/validationMiddleware");
const { wrapper } = require("../../utils/wrapper");
const { constants } = require("../../utils/constants");
const {
  validateGetTransactionShema,
  validateAddTransactionShema,
  validateDeleteTransactionShema,
} = require("../../schemas/validation");

const router = express.Router();
const { REQ_VALIDATION_TARGET } = constants;

const getTransactionsValidation = validation(
  validateGetTransactionShema,
  REQ_VALIDATION_TARGET.QUERY
);
const deleteTransactionValidation = validation(
  validateDeleteTransactionShema,
  REQ_VALIDATION_TARGET.PARAMS
);
const addTransactionValidation = validation(
  validateAddTransactionShema,
  REQ_VALIDATION_TARGET.BODY
);

router.use(authMiddleware);

router.get(
  "/",
  wrapper(getTransactionsValidation),
  financeController.getFinance
);
router.post(
  "/",
  wrapper(addTransactionValidation),
  financeController.addFinance
);
router.delete(
  "/:financeId",
  wrapper(deleteTransactionValidation),
  financeController.deleteFinance
);
router.get("/balance", financeController.getCurrentBalance);
router.patch("/balance", financeController.updateBalance);

module.exports = router;
