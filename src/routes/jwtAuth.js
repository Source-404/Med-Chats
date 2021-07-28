const router = require("express").Router();
const bcrypt = require("bcrypt");
require("../db/mongoose");
const User = require("../models/user");

router.get("/checking", (req, res) => {
  res.send("hello");
});

router.get("/", (req, res) => {
  res.send("welcome");
});

router.post("/users", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      console.log("saved successfully");
      res.send(user);
    })
    .catch((err) => {
      // console.log("couldnt save", err);
      res.status(400).send(err);
    });
});

module.exports = router;
