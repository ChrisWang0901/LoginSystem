const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");

router.get("/", (req, res) => {
  res.render("register.ejs");
});
router.post("/", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    // const hashPassword = await bcrypt.hash(req.body.password, salt);
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log("user existed");
      res.redirect("/register");
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await newUser.save();

    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.redirect("/register");
  }
});

module.exports = router;
