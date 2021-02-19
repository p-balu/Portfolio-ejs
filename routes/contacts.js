let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//connect to out contacts Model
let Contact = require("../models/contacts");

/** Get route for the contacts list--> read operation */

router.get("/", (req, res, next) => {
  Contact.find((err, ContactList) => {
    if (err) {
      return console.log(err);
    } else {
      res.render("contacts", {
        title: "Business Contacts",
        ContactList: ContactList,
      });
    }
  });
});

/** Get route for the contacts list--> update operation */

router.put("/", (req, res, next) => {
  Contact.updateOne((err, ContactList) => {
    if (err) {
      return console.log(err);
    } else {
      res.render("contacts", {
        title: "Business Contacts",
        ContactList: ContactList,
      });
    }
  });
});

/** Get route for the contacts list--> delete operation */

router.delete("/", (req, res, next) => {
  Contact.remove((err, ContactList) => {
    if (err) {
      return console.log(err);
    } else {
      res.render("contacts", {
        title: "Business Contacts",
        ContactList: ContactList,
      });
    }
  });
});

module.exports = router;
