const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../schemas/user");
const validateRegisterSchema = require("../../schemas/validation");

const { SECRET_KEY } = process.env;

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const { error } = validateRegisterSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: "Wrong email or password" });
    }

    const user = await User.findOne({ email });
    const userPassword = await bcrypt.compare(password, user.password);
    if (!user || !userPassword) {
      res.status(401).json({ message: "Email or password is wrong" });
    }

    // if (!user.verify) {
    //   res.json({ message: "Your Email is not verifyied!" });
    // }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      status: "success",
      code: 200,
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = login;
