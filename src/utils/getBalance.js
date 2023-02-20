const getBalance = (balanceDoc) => {
  const { entryFee, totalIncome, totalCost } = balanceDoc;
  return entryFee + totalIncome - totalCost;
};

module.exports = getBalance;
