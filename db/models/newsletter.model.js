var mongoose = require("mongoose");
var schema = require("../schemas/newsletter.schema");

module.exports = mongoose.model("Newsletter", schema);
