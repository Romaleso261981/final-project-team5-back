const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const verifyEmail = require("./verifyEmail")
const resendEmail = require("./resendEmail")
const deleteUser = require("./deleteUser")
const { googleAuth } = require("./google");
const { googleRedirect } = require("./google");

module.exports = {
  signup,
  login,
  logout,
  current,
  googleAuth,
  googleRedirect,
  verifyEmail,
  resendEmail,
  deleteUser,
};
