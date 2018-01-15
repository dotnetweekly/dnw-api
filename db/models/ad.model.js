var mongoose = require("mongoose");
var schema = require("../schemas/ad.schema");

module.exports = mongoose.model("Ad", schema);
