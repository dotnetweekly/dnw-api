var mongoose = require("mongoose");
var schema = require("../schemas/user.schema");

module.exports = mongoose.model("User", schema);
