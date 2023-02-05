require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const compression = require("compression");
const { default: helmet } = require("helmet");
const cors = require("cors");

var usersRouter = require("./routes/users");
var catalogRouter = require("./routes/catalog");

var app = express();

// Setup MONGOOSE Connection
const mongoose = require("mongoose");
mongoose.set("toJSON", { virtuals: true });
mongoose.set("strictQuery", false);

const dev_db_url =
  "mongodb+srv://MyFirstMongo:1234@myfirstmongo.3pf8i.mongodb.net/loan_coop_test_2?retryWrites=true&w=majority";
const mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// MIDDLEWARES
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  })
);
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", catalogRouter);
app.use("/users", usersRouter);

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
  res.json({ error: err });
});

module.exports = app;
