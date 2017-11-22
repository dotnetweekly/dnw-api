var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var stringValidate = require("../validations/strings.validate");

var commentSchema = new Schema({
  content: {
    type: String,
    required: true,
    validate: stringValidate.requiredStringValidator
  },
  isActive: { type: Boolean, default: true },
  link: { type: Schema.ObjectId, ref: "Link" },
  user: { type: Schema.ObjectId, ref: "User" },
  createdOn: { type: Date, default: Date.now }
});

module.exports = commentSchema;
