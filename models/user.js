/* user.js
Balachander Rao Palepu, 301170247, 07-02-2021
*/

let mongoose = require("mongoose");

//create model class for users
let usersModel = mongoose.Schema(
  {
    username: String,
    password: String,
    email: String,
  },
  {
    collection: "users",
  }
);
module.exports = mongoose.model("User", usersModel);
