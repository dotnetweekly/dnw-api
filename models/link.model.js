var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var stringValidate = require("validations/strings.validate");

var categorySchema = require("category.model");
var tagSchema = require("tag.model");
var userSchema = require("user.model");

var linkSchema = new Schema({
  title: {
    type: String,
    required: true,
    validate: stringValidate.requiredStringValidator
  },
  content: {
    type: String,
    required: true,
    validate: stringValidate.requiredStringValidator
  },
  url: {
    type: String,
    required: true,
    validate: stringValidate.requiredStringValidator
  },
  image: {
    type: String,
    required: true,
    validate: stringValidate.requiredStringValidator
  },
  upvotes: {
    type: Number,
    required: true,
    default: 0
  },
  category: categorySchema,
  tags: [tagSchema],
  user: userSchema,
  createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Link", linkSchema);
