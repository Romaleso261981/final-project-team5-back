const jwt = require("jsonwebtoken");
const { User } = require("../schemas/user");
const { ACCESS_SECRET_KEY } = process.env;

const authMiddleware = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  try {
    if (bearer !== "Bearer" || !token) {
      res.status(401).json({ message: "Not authorized" });
    }
    const { id } = jwt.verify(token, ACCESS_SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      res.status(401).json({ message: "Not authorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authMiddleware,
};
