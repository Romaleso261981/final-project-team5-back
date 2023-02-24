const express = require("express");
const { financeController } = require("../../controllers");
const router = express.Router();
// ------------------------------------------------------------------
const validation = require("../../middlewares/validationMiddleware");
const wrapper = require("../../utils/wrapper");
const constants = require("../../utils/constants");
const { REQ_VALIDATION_TARGET } = constants;
const {
  validateGetTransactionShema,
  validateAddTransactionShema,
  validateDeleteTransactionShema,
} = require("../../schemas/validation");

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
const balanceValidation = validation(
  validateBalanceShema,
  REQ_VALIDATION_TARGET.BODY
);

router.get("/", financeController.getFinance); // wrapper(getTransactionsValidation),
router.post("/", financeController.addFinance); // wrapper(addTransactionValidation),
router.delete("/:financeId", financeController.deleteFinance); // wrapper(deleteTransactionValidation),
router.get("/balance", financeController.getCurrentBalance);
router.patch("/balance", financeController.updateBalance); // wrapper(balanceValidation),

const { _id: owner } = req.user;
const result = await Balance.findOne({ owner }).select({
  entryFee: 1,
  totalCost: 1,
  totalIncome: 1,
});
if (!result) throw createError(404, ERROR_MESSAGES.notFound);
const { entryFee, totalIncome, totalCost } = result;
const balance = entryFee + totalIncome - totalCost;
res.status(200).json({
  status: "success",
  code: 200,
  result: balance,
});
