const express = require("express");
const { financeController } = require("../../controllers");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

// 7. Реалізувати енд-поінт оновлення балансу користувача
router.get("/balance", financeController.getBalance);
router.put("/balance", financeController.setBalance);

// 8. Реалізувати енд-поінт додавання витрати // Expenses -
// 9. Реалізувати енд-поінт отримання доходу  // Income +
// 10. Реалізувати енд-поінт видалення транзакції
router.get("/", financeController.getFinance);
router.post("/expenses", financeController.addExpenses);
router.post("/income", financeController.addIncome);
router.post("/", financeController.addTransaction);
router.delete("/:transactionId", financeController.deleteTransaction);

// 11. Реалізувати енд-поінт отримання зведення про місяці поточного року щодо витрат
// 12. Реалізувати енд-поінт отримання зведення про місяці поточного року за доходами
// Summary: last 6 month // Income + // Expenses -
router.get("/summary/expenses", financeController.getSummaryExpenses);
router.get("/summary/income", financeController.getSummaryIncome);
router.get("/summary", financeController.getSummary);

module.exports = router;

// 13. Реалізувати енд-поінт отримання докладної інформації (дивитися макет)
//     про витрати та доходи за конкретні місяць та рік
// Reports:
//
