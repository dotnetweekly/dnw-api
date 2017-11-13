var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var stringValidate = require("../validations/strings.validate");

var userSchema = new Schema({
  email: {
    type: String,
    required: true,
    validate: stringValidate.requiredStringValidator
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
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
