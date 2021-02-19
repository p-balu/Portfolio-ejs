let mongoose = require("mongoose");

//create model class for contacts
let contactModel = mongoose.Schema(
  {
    contactName: String,
    contactNumber: Number,
    email: String,
  },
  {
    collection: "contacts",
  }
);
module.exports = mongoose.model("Contact", contactModel);
