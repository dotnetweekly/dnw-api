var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var stringValidate = require("../validations/strings.validate");

var tagSchema = require("./tag.schema");
var commentSchema = require("./comment.schema");

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
  slug: {
    type: String,
    require: true,
    unique: true
  },
  url: {
    type: String,
    required: true,
    validate: stringValidate.requiredStringValidator
  },
  image: {
    type: String,
    required: false
  },
  upvotes: {
    type: Number,
    required: true,
    default: 0
  },
  isActive: { type: Boolean, default: true },
  category: { type: Schema.ObjectId, ref: "Category" },
  tags: [tagSchema],
  comments: [commentSchema],
  user: { type: Schema.ObjectId, ref: "User" },
  createdOn: { type: Date, default: Date.now }
});

module.exports = linkSchema;
