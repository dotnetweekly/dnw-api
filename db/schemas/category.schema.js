const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stringValidate = require('../validations/strings.validate');
const CalendarHelper = require('../../helpers/calendar.helper');

const categorySchema = new Schema({
	name: {
		type: String,
		required: true,
		validate: {
			validator: function(v) {
				return v && v.length <= 50;
			},
			message: '{VALUE} is required and max size is 50 characters'
		}
	},
	slug: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: function(v) {
				return v && v.length <= 300;
			},
			message: '{VALUE} is required and max size is 300 characters'
		}
	},
	isActive: { type: Boolean, default: true },
	createdOn: { type: Date, default: CalendarHelper.getUtcNow() }
});

module.exports = categorySchema;
