const express = require("express");
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
        res.redirect("/home");
      }
    }
    res.redirect("/login");
  } catch (error) {
    console.error(error);
  }
});
// router.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile"] })
// );

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     res.redirect("/home");
//   }
// );
module.exports = router;
