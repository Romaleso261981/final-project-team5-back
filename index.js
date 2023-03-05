const passport = require("passport");
const session = require("express-session");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

require("./auth");

const app = express();

app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Google login</a>');
});

app.get("/protected", isLoggedIn, (req, res) => {
  res.send(`Hello, ${req.user.displayName}!`);
});

app.get(
  "/auth/users/google-redirect",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  })
);

app.get("/auth/failure", (req, res) => {
  res.send("error");
});

app.get("/logout", (req, res) => {
  req.logOut(req.user, (err) => {
    if (err) return next(err);
    res.redirect("/");
  });
  req.session.destroy()
  res.send("Пака!");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.listen(3000, () => console.log("listening on 3000"));
