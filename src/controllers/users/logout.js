const { User } = require("../../schemas/user");

async function logout(req, res, next) {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { accessToken: null, refreshToken: null });
    res.status(204).json({ message: "Logout was successfull" });
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
}

module.exports = logout;
