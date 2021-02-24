let express = require("express");
let router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
let flash = require("connect-flash");

let Contact = require("../models/contacts");

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

/* GET Business contacts page. */
router.get("/business-contacts", ensureAuthenticated, (req, res, next) => {
  Contact.find({})
    .sort("contactName")
    .exec(function (err, ContactList) {
      if (err) {
        return console.log(err);
      } else {
        res.render("contacts", {
          title: "Business Contacts",
          ContactList: ContactList,
          username: req.user.username,
          messages: req.flash("message"),
        });
      }
    });
});
/* GET Business contact Add page. */
router.get("/business-contacts/add/", ensureAuthenticated, (req, res, next) => {
  //show the add view
  res.render("add", {
    title: "Add Contact",
  });
});

/* GET Business contact Edit page. */
router.get(
  "/business-contacts/edit/:id",
  ensureAuthenticated,
  (req, res, next) => {
    let id = req.params.id;

    Contact.findById(id, (err, ContactToEdit) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        //show the edit view
        res.render("edit", {
          title: "Edit Contact",
          contact: ContactToEdit,
        });
      }
    });
  }
);

/* POST Business contacts page. create operation*/
router.post("/business-contacts/add", ensureAuthenticated, (req, res, next) => {
  console.log("Add entered");

  let newContact = Contact({
    username: req.user.username,
    name: req.body.name,
    contactName: req.body.contactName,
    email: req.body.email,
    contactNumber: req.body.contactNumber,
    organisationName: req.body.organisationName,
  });

  Contact.create(newContact, (err, Contact) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the Business Contacts List
      req.flash("message", "Contact added succesfully"),
        res.redirect("/business-contacts");
    }
  });
});

/* POST Business contacts page. update operation*/
router.post(
  "/business-contacts/edit/:id",
  ensureAuthenticated,
  (req, res, next) => {
    console.log("update entered");

    let id = req.params.id;
    console.log(id);
    let updateContact = Contact({
      _id: req.params.id,
      username: req.user.username,
      name: req.body.name,
      contactName: req.body.contactName,
      email: req.body.email,
      contactNumber: req.body.contactNumber,
      organisationName: req.body.organisationName,
    });
    Contact.updateOne({ _id: id }, updateContact, (err) => {
      console.log("test loop", id);
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        console.log("success");
        // refresh the Business Contacts List
        req.flash("message", "Contact updated Successfully");
        res.redirect("/business-contacts");
      }
    });
  }
);

/* DELETE Business contact delete operation. */
router.get(
  "/business-contacts/delete/:id",
  ensureAuthenticated,
  (req, res, next) => {
    console.log("delete entered");
    let id = req.params.id;
    Contact.deleteOne({ _id: id }, (err) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        // refresh the Business Contacts List
        req.flash("message", "Contact deleted Successfully");
        res.redirect("/business-contacts");
      }
    });
  }
);

/* GET Login page. */
router.get("/login", function (req, res, next) {
  res.render("login", {
    title: "Login",
    messages: req.flash("loginMessage"),
  });
});

module.exports = router;
