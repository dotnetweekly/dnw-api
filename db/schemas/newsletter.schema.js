const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stringValidate = require('../validations/strings.validate');
const CalendarHelper = require('../../helpers/calendar.helper');

const tagSchema = new Schema({
	week: {
		type: Number,
		required: true
	},
	year: {
		type: Number,
		required: true
	},
	isActive: { type: Boolean, default: true },
	createdOn: { type: Date, default: CalendarHelper.getUtcNow() }
});

module.exports = tagSchema;
