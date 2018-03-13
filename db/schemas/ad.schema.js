const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stringValidate = require('../validations/strings.validate');
const CalendarHelper = require('../../helpers/calendar.helper');

const adSchema = new Schema({
	name: {
		type: String,
		required: true,
		validate: {
			validator: function(v) {
				return v && v.length <= 500;
			},
			message: '{VALUE} is required and max size is 500 characters'
		}
	},
	slug: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: function(v) {
				return v && v.length <= 1000;
			},
			message: '{VALUE} is required and max size is 1000 characters'
		}
	},
	isActive: { type: Boolean, default: true },
	createdOn: { type: Date, default: CalendarHelper.getUtcNow() }
});

module.exports = adSchema;
