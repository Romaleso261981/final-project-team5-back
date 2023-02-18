async function current(req, res, next) {
  return res.status(501).json({ message: "current Not Implemented" });
}

module.exports = current;
