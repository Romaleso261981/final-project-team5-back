const jwt = require("jsonwebtoken");
const { User } = require("../../schemas/user");
const { refreshSchema } = require("../../schemas/validation");

const refresh = async (req, res, next) => {
  try {
    const { refreshToken: token } = req.body;
    const { REFRESH_SECRET_KEY, ACCESS_SECRET_KEY } = process.env;
    const { error } = refreshSchema.validate(req.body);

    if (error) {
      res.status(403).json({ message: "Wrong token" });
    }
    const { id } = jwt.verify(token, REFRESH_SECRET_KEY);
    const isExist = await User.findOne({ refreshToken: token });
    if (!isExist) {
      res.status(403).json({ message: "Token is not valid" });
    }

    const payload = {
      id,
    };

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: "2m",
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = refresh;
