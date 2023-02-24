const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../schemas/user");
const { validateRegisterSchema } = require("../../schemas/validation");

const { SECRET_KEY } = process.env;

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const { error } = validateRegisterSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Wrong email or password" });
    }

    const user = await User.findOne({ email });
    const userPassword = await bcrypt.compare(password, user.password);
    if (!user || !userPassword) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    if (!user.verify) {
      return res.status(401).json({ message: "Your Email is not verifyied!" });
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
      token: token,
      user: {
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = login;
