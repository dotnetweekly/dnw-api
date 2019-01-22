const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weeklyCalendarHelper = require("weekly-calendar-helper");

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return v && v.length <= 50;
      },
      message: "{VALUE} is required and max size is 50 characters"
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
      message: "{VALUE} is required and max size is 300 characters"
    }
  },
  isActive: { type: Boolean, default: true },
  createdOn: { type: Date, default: weeklyCalendarHelper.base.getUtcNow() }
});

module.exports = categorySchema;
