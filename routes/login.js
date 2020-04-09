const express = require("express");
const session = require("express-session");
const router = express.Router();
const passport = require("passport");
const bycrypt = require("bcryptjs");
const User = require("../models/User");
router.get("/", (req, res) => res.render("login.ejs"));
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      const verified = await bycrypt.compare(req.body.password, user.password);
      console.log(verified);
      if (verified) {
        req.session.context = user;
        res.redirect("/home");
      }
    }
    // res.redirect("/login");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
