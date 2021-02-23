const express = require("express");
const router = express.Router();
const passport = require("passport");
const { ensureAuthenticated } = require("../config/auth");

// Login post handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/business-contacts",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
