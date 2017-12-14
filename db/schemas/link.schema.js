var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var stringValidate = require("../validations/strings.validate");

var tagSchema = require("./tag.schema");
var commentSchema = require("./comment.schema");
var userSchema = require("./user.schema");

var linkSchema = new Schema({
  title: {
    type: String,
    required: true,
		validate: {
			validator: function(v) {
				return v && v.length < 100
			},
			message: '{VALUE} max size is 100 characters'
		}
  },
  content: {
    type: String,
    required: true,
		validate: {
			validator: function(v) {
				return v && v.length < 2000
			},
			message: '{VALUE} max size is 2000 characters'
		}
  },
  slug: {
    type: String,
    require: true,
    unique: true,
		validate: {
			validator: function(v) {
				return v && v.length < 100
			},
			message: '{VALUE} max size is 100 characters'
		}
  },
  url: {
    type: String,
    required: true,
		validate: {
			validator: function(v) {
				return v && v.length < 500
			},
			message: '{VALUE} max size is 500 characters'
		}
  },
  upvotes: [String],
  isActive: { type: Boolean, default: true },
  category: { 
    type: Schema.ObjectId,
    ref: "Category",
    validate: {
      validator: function(category) {
        return category
      },
      message: 'at least 1 {VALUE}'
    } 
  },
  comments: [commentSchema],
  user: { type: Schema.ObjectId, ref: "User" },
  createdOn: { type: Date, default: Date.now }
});

module.exports = linkSchema;
