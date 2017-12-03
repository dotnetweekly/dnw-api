var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var stringValidate = require("../validations/strings.validate");

var tagSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: stringValidate.requiredStringValidator
  },
  slug: {
    type: String,
    required: true,
    validate: stringValidate.requiredStringValidator
  },
  isActive: { type: Boolean, default: true },
  user: { type: Schema.ObjectId, ref: "User" },
  createdOn: { type: Date, default: Date.now }
});

module.exports = tagSchema;
