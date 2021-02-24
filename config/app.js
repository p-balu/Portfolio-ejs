// app.js file
let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
let logger = require("morgan");
let session = require("express-session");
let passport = require("passport");
let flash = require("connect-flash");

//passport config
require("../config/passport")(passport);

let app = express();

//database setup
let mongoose = require("mongoose");
let DB = require("./db");

//point mongoose to the DB URI
mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedTopology: true });
let mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "Connection Error: "));
mongoDB.once("open", () => {
  console.log("Connected to mongoDB...");
});

//Bodypasrser
app.use(express.urlencoded({ extended: false }));

//Express Session({
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUnintialized: true,
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});
let indexRouter = require("../routes/index");
let usersRouter = require("../routes/users");

// initialize flash
app.use(flash());

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../node_modules")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
// app.use("/business-contacts", contactsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { title: "Error" });
});

module.exports = app;
