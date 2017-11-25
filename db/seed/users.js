var mongoose = require("mongoose");
var User = require("../models/user.model");
var users = [];

var adminUser = new User({
  _id: new mongoose.Types.ObjectId(),
  email: "bstavroulakis@gmail.com",
  firstName: "Bill",
  lastName: "Stavroulakis",
  subscribed: true,
  isAdmin: true,
  password: "dotnetweekly",
  username: "bstavroulakis",
  twitter: "",
  github: ""
});

users.push(adminUser);

module.exports = users;
