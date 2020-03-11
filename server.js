const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const passport = require("passport");

const users = [];

app.set("view-engine", "ejs");
// body parser
app.use(express.urlencoded({ extended: false }));
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
    const newUser = {
      id: uuid.v1(),
      name: req.body.name,
      email: req.body.email,
      password: hashPassword
    };
    users.unshift(newUser);

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
