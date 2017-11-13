var mongoose = require("mongoose");
var schema = require("../schemas/tag.schema");

module.exports = mongoose.model("Tag", schema);
