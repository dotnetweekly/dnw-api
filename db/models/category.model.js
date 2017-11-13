var mongoose = require("mongoose");
var schema = require("../schemas/category.schema");

module.exports = mongoose.model("Category", schema);
