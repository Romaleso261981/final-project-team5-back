const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const { User } = require("../../schemas/user");
const validateRegisterSchema = require("../../schemas/validation");
const sendEmail = require("../../services/sendEmail")

async function signup(req, res, next) {
  try {
    const { EMAIL_USER } = process.env;
    const { email, password } = req.body;
    const { error } = validateRegisterSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: "Invalid value of email or password" });
      return;
    }
    const userCheck = await User.findOne({ email });
    if (userCheck) {
      res.status(409).json({ message: "Email in use" });
      return;
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const avatar = gravatar.url(email);
    const verificationToken = uuidv4();

    const newUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL: avatar,
      verificationToken,
    });

    const msg = {
      from: EMAIL_USER,
      to: email,
      subject: "Please, verify your email",
      html: `<a target="_blank"
      href="http://localhost:3000/auth/users/verify/${verificationToken}">Email verification</a>`,
    };

    await sendEmail(msg);

    res.status(201).json({
      status: "success",
      code: 201,
      user: {
        email: newUser.email,
        avatar,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = signup;
