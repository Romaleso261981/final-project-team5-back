const { User } = require("../../schemas/user");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });
  return res.status(200).json({ message: "Verification successful" });
};

module.exports = verifyEmail;
