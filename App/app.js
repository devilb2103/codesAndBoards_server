const express = require("express");
const cors = require("cors");
const passport = require("passport");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { sequelize } = require("../Database/setup");

dotenv.config();

const app = express();

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

// app.listen(port, () => console.log(`port ${port}`));

app.get("*", (req, res) => {
  res.status(404).send({ status: false, message: "No Found" });
});

app.post("*", (req, res) => {
  res.status(404).send({ status: false, message: "No Found" });
});

app.use(async (req, res, next) => {
  next(createError(404, "Not Found"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: false,
    enviroment: process.env.MODE,
    message:
      err.status === 403
        ? err.message
        : process.env.MODE === "development"
        ? err.message
        : "Error Occoured",
  });
});

sequelize.sync().then(() => {
  app.listen(port, () => console.log(`port ${port}`));
});
