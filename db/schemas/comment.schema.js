var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var stringValidate = require("../validations/strings.validate");

var commentSchema = new Schema({
  content: {
    type: String,
    required: true,
		validate: {
			validator: function(v) {
				return v && v.length < 1000
			},
			message: '{VALUE} is required and max size is 1000 characters'
		}
  },
  isActive: { type: Boolean, default: true },
  user: { type: Schema.ObjectId, ref: "User" },
  createdOn: { type: Date, default: Date.now }
});

module.exports = commentSchema;
