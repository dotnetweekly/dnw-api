var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var stringValidate = require("../validations/strings.validate");

var categorySchema = require("./category.schema");
var tagSchema = require("./tag.schema");
var userSchema = require("./user.schema");

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
  category: { type: Schema.ObjectId, ref: "Category" },
  tags: [tagSchema],
  user: { type: Schema.ObjectId, ref: "User" },
  createdOn: { type: Date, default: Date.now }
});

module.exports = linkSchema;
