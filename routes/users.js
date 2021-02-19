let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//connect to out user Model
let Users = require("../models/users");

/** Get route for the user authentication read operation */

router.get("/", (req, res, next) => {
  Users.find((err, User) => {
    if (err) {
      return console.log(err);
    } else {
      console.log(User);
    }
  });
});

module.exports = router;
