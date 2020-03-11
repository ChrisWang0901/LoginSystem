const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");
const connectDB = require("./config/db");
connectDB();

const users = [];

app.set("view-engine", "ejs");

// body parser
app.use(express.urlencoded({ extended: false }));
//The local authentication strategy authenticates users using a username and password. The strategy requires a verify callback,
// which accepts these credentials and calls done providing a user.
passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.verifyPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/register", (req, res) => {
  res.render("register.ejs");
});
app.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      id: uuid.v1(),
      name: req.body.name,
      email: req.body.email,
      password: hashPassword
    });
    await newUser.save();

    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.redirect("/register");
  }
  console.log(users);
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", async (req, res) => {});

app.listen(5000, () => console.log("Server starts on 5000"));
