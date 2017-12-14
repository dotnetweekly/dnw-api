var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var stringValidate = require("../validations/strings.validate");

var tagSchema = new Schema({
  name: {
    type: String,
    required: true,
		validate: {
			validator: function(v) {
				return v && v.length < 20
			},
			message: '{VALUE} is required and max size is 20 characters'
		}
  },
  slug: {
    type: String,
    required: true,
		validate: {
			validator: function(v) {
				return v && v.length < 300
			},
			message: '{VALUE} is required and max size is 300 characters'
		}
  },
  isActive: { type: Boolean, default: true },
  user: { type: Schema.ObjectId, ref: "User" },
  createdOn: { type: Date, default: Date.now }
});

module.exports = tagSchema;
