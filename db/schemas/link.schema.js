const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stringValidate = require('../validations/strings.validate');
const tagSchema = require('./tag.schema');
const commentSchema = require('./comment.schema');
const userSchema = require('./user.schema');
const CalendarHelper = require('../../helpers/calendar.helper');

const linkSchema = new Schema({
	title: {
		type: String,
		required: true,
		validate: {
			validator: function(v) {
				return v && v.length <= 500;
			},
			message: '{VALUE} is required and max size is 500 characters'
		}
	},
	content: {
		type: String,
		required: true,
		validate: {
			validator: function(v) {
				return v && v.length <= 10000;
			},
			message: '{VALUE} is required and max size is 10000 characters'
		}
	},
	slug: {
		type: String,
		require: true,
		unique: true,
		validate: {
			validator: function(v) {
				return v && v.length <= 1000;
			},
			message: '{VALUE} is required and max size is 1000 characters'
		}
	},
	url: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: function(v) {
				return v && v.length <= 2000;
			},
			message: '{VALUE} is required and max size is 2000 characters'
		}
	},
	imageUrl: {
		type: String,
		required: false,
		unique: false,
		validate: {
			validator: function(v) {
				return v && v.length <= 2000;
			},
			message: '{VALUE} is required and max size is 2000 characters'
		}
	},
	upvotes: [String],
	isActive: { type: Boolean, default: true },
	isPayed: {
		type: Boolean,
		default: false
	},
	category: {
		type: String,
		required: true
	},
	clickedTimes: {
		type: Number,
		default: 0
	},
	tags: {
		type: [String],
		validate: {
			validator: function(tags) {
				return tags;
			},
			message: 'at least 3 {VALUE}'
		}
	},
	comments: [commentSchema],
	user: { type: Schema.ObjectId, ref: 'User' },
	createdOn: { type: Date, default: CalendarHelper.getUtcNow() }
});

module.exports = linkSchema;
