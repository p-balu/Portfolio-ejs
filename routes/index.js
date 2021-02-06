var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Home" });
});

router.get("/home", function (req, res, next) {
  res.render("index", { title: "Home" });
});

router.get("/about", (req, res, next) => {
  res.render("about", { title: "About" });
});

router.get("/projects", (req, res, next) => {
  res.render("projects", { title: "Projects" });
});

router.get("/services", (req, res, next) => {
  res.render("services", { title: "Services" });
});

router.get("/contact", (req, res, next) => {
  res.render("contact", { title: "Contact" });
});

module.exports = router;
