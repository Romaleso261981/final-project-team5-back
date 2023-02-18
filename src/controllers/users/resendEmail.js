const { User } = require("../../schemas/user");
const sendEmail = require("../../services/sendEmail");

const resendEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { EMAIL_USER } = process.env;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "missing required field email" });
    }

    if (user.verify) {
      res.status(400).json({
        message: "Verification has been already passed",
      });
    }

    const msg = {
      from: EMAIL_USER,
      to: email,
      subject: "Please, verify your email",
      html: `<a target="_blank" 
      href="http://localhost:3000/api/users/verify/${user.verificationToken}">Email verification</a>`,
    };

    await sendEmail(msg);
    res.status(200).json({
      message: "Verification email sended",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendEmail;
