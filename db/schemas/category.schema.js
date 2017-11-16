var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var stringValidate = require("../validations/strings.validate");

var categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: stringValidate.requiredStringValidator
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    validate: stringValidate.requiredStringValidator
  },
  isActive: { type: Boolean, default: true },
  createdOn: { type: Date, default: Date.now }
});

module.exports = categorySchema;
