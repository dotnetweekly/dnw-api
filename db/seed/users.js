var mongoose = require("mongoose");
var User = require("../models/user.model");
var users = [];

users.push(
  new User({
    _id: new mongoose.Types.ObjectId(),
    email: "bstavroulakis@gmail.com",
    firstName: "Bill",
    lastName: "Stavroulakis",
    subscribed: true,
    isAdmin: true
  })
);

module.exports = users;
