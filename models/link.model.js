var mongoose = require("mongoose");
var linkSchema = require("./schemas/link.schema");

module.exports = mongoose.model("Link", linkSchema);
