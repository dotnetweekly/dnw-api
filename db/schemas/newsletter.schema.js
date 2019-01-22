const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stringValidate = require("../validations/strings.validate");
const weeklyCalendarHelper = require("weekly-calendar-helper");

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
  createdOn: {
    type: Date,
    default: weeklyCalendarHelper.baseHelper.getUtcNow()
  }
});

module.exports = tagSchema;
