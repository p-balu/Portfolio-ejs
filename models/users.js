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
module.exports = mongoose.model("Users", usersModel);
