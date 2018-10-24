// var createError = require('http-errors');
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");

var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var config = require("./config");

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb://heroku_5gnmvnr6:fpv8dh6cpmh41qfoaojf8480v6@ds119395.mlab.com:19395/heroku_5gnmvnr6"
);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//use sessions for tracking logins
app.use(
  session({
    secret: "work hard",
    resave: true,
    saveUninitialized: false
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);

// Error Handling
app.use((err, req, res, next) => {
	res.sendStatus(err.status || 500).json(err)
})

//Launch app
app.listen(config.PORT, () => {
  console.log(`App start on port ${config.PORT}`);
});

module.exports = app;
