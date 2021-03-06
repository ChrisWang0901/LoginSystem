const express = require("express");
const app = express();
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const connectDB = require("./config/db");
connectDB();

require("./config/passport")(passport);

app.set("view-engine", "ejs");
app.use(express.static("views"));
// body parser
app.use(express.urlencoded({ extended: false }));
// express-session
app.use(
  session({
    secret: "chriswang0901",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000000 },
  })
);
// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

app.get("/", (req, res) => {
  res.render("index.ejs");
});
// app.get("/login", (req, res) => res.render("login.ejs"));
// app.post("/login", (req, res) => {
//   console.log(req.body);
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureMessage: "fail!!",
//     successRedirect: "/home",
//   });
//   res.send(req.body);
//   // res.redirect("/home");
// });
app.use("/login", require("./routes/login"));
app.use("/register", require("./routes/register"));

// app.get("/home", (req, res) => {
//   res.render("home.ejs");
// });
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/home",
    failureRedirect: "/login",
  })
);
app.get("/auth/facebook", passport.authenticate("facebook"));
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/home",
    failureRedirect: "/login",
  })
);
app.get("/home", (req, res) => {
  res.render("home.ejs", req.session.context);
});

app.listen(5000, () => console.log("Server starts on 5000"));
