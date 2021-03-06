const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stringValidate = require("../validations/strings.validate");
const weeklyCalendarHelper = require("weekly-calendar-helper");

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return v && v.length <= 20;
      },
      message: "{VALUE} is required and max size is 20 characters"
    }
  },
  slug: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return v && v.length <= 300;
      },
      message: "{VALUE} is required and max size is 300 characters"
    }
  },
  isActive: { type: Boolean, default: true },
  user: { type: Schema.ObjectId, ref: "User" },
  createdOn: {
    type: Date,
    default: weeklyCalendarHelper.baseHelper.getUtcNow()
  }
});

module.exports = tagSchema;
