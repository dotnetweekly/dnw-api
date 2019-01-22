const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weeklyCalendarHelper = require("weekly-calendar-helper");

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return v && v.length <= 2000;
      },
      message: "{VALUE} is required and max size is 2000 characters"
    }
  },
  isActive: { type: Boolean, default: true },
  user: { type: Schema.ObjectId, ref: "User" },
  createdOn: {
    type: Date,
    default: weeklyCalendarHelper.baseHelper.getUtcNow()
  }
});

module.exports = commentSchema;
