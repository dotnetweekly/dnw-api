var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require("../db/models.user.model");

exports.register = function(req, res) {};

exports.signIn = function(req, res) {};

exports.loginRequired = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!" });
  }
};
