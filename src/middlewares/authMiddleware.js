const authMiddleware = async (req, res, next) => {
  // return res.status(501).json({ message: "authMiddleware no implementation" });
  next();
};

module.exports = {
  authMiddleware,
};
