var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Home" });
});

/* GET home page. */
router.get("/home", function (req, res, next) {
  res.render("index", { title: "Home" });
});

/* GET about page. */
router.get("/about", (req, res, next) => {
  res.render("about", { title: "About" });
});

/* GET projects page. */
router.get("/projects", (req, res, next) => {
  res.render("projects", { title: "Projects" });
});

/* GET services page. */
router.get("/services", (req, res, next) => {
  res.render("services", { title: "Services" });
});

/* GET contact page. */
router.get("/contact", (req, res, next) => {
  res.render("contact", { title: "Contact" });
});

/* Post Contact page and redirect to home page */
router.post("/contact", (req, res, next) => {
  console.log("entered");
  console.log(req.body);
  res.redirect("/home");
});

module.exports = router;
