const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { User } = require("../../schemas/user");
const { validateRegisterSchema } = require("../../schemas/validation");
const sendEmail = require("../../services/sendEmail");

async function signup(req, res, next) {
  try {
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
    const verificationToken = uuidv4();

    const newUser = await User.create({
      email,
      password: hashedPassword,
      verificationToken,
    });

    await sendEmail(email, verificationToken);

    res.status(201).json({
      status: "success",
      code: 201,
      user: {
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = signup;
