var mongoose = require("mongoose");
var userModel = require("../models/user.model");
var categorySchema = require("./category.model");
var linkSchema = require("../schemas/link.schema");

module.exports = mongoose.model("Link", linkSchema);
