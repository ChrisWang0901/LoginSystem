const express = require("express");
const router = express.Router();
const passport = require("passport");
router.get("/", (req, res) => res.render("login.ejs"));
router.post(
  "/",

  (req, res) => {
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureMessage: "fail!!",
    });
    res.redirect("/home");
  }
);
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
