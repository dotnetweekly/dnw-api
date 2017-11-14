var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require("../db/models.user.model");

exports.register = function(req, res) {
  var newUser = new User(req.body);
  newUser.password = req.body.password;
  newUser.save(function(err, user) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      return res.json(user.toJson());
    }
  });
};

exports.sign_in = function(req, res) {
  User.findOne(
    {
      email: req.body.email
    },
    function(err, user) {
      if (err) throw err;
      if (!user) {
        res
          .status(401)
          .json({ message: "Authentication failed. User not found." });
      } else if (user) {
        if (!user.checkPassword(req.body.password)) {
          res
            .status(401)
            .json({ message: "Authentication failed. Wrong password." });
        } else {
          return res.json({
            token: jwt.sign(
              { email: user.email, fullName: user.fullName, _id: user._id },
              "RESTFULAPIs"
            )
          });
        }
      }
    }
  );
};

exports.loginRequired = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!" });
  }
};
