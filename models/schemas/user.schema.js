var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var stringValidate = require("../validations/strings.validate");

var userSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: stringValidate.requiredStringValidator
  },
  subscribed: {
    type: Boolean,
    required: true,
    default: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  createdOn: { type: Date, default: Date.now }
});

module.exports = userSchema;
