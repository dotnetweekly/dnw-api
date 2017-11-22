var mongoose = require("mongoose");
var userModel = require("../models/user.model");
var linkSchema = require("../schemas/link.schema");
var commentSchema = require("../schemas/comment.schema");

module.exports = mongoose.model("LinkComment", commentSchema);
