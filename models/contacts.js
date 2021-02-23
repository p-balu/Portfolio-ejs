let mongoose = require("mongoose");

//create model class for contacts
let contactModel = mongoose.Schema(
  {
    name: String,
    contactName: String,
    email: String,
    contactNumber: Number,
    organisationName: String,
    username: String,
  },
  {
    collection: "contacts",
  }
);
module.exports = mongoose.model("Contact", contactModel);
