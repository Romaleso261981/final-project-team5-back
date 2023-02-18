async function logout(req, res, next) {
  return res.status(501).json({ message: "logout Not Implemented" });
}

module.exports = logout;
