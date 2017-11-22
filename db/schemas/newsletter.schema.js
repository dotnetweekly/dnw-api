var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var stringValidate = require("../validations/strings.validate");

var tagSchema = new Schema({
  title: {
    type: String,
    required: true,
    validate: stringValidate.requiredStringValidator
  },
  slug: {
    type: String,
    required: true,
    validate: stringValidate.requiredStringValidator
  },
  path: {
    type: String,
    required: true,
    validate: stringValidate.requiredStringValidator
  },
  week: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  isActive: { type: Boolean, default: true },
  createdOn: { type: Date, default: Date.now }
});

module.exports = tagSchema;
