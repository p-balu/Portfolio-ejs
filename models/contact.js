/* contact.js
Balachander Rao Palepu, 301170247, 07-02-2021
*/

let mongoose = require("mongoose");

//create model class for contacts
let contactMeModel = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    mobile: Number,
    description: String,
  },
  {
    collection: "contactMe",
  }
);
module.exports = mongoose.model("ContactMe", contactMeModel);
