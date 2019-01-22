const Promise = require("es6-promise").Promise;
const mongoose = require("mongoose");
const path = require("path");
const Guid = require("guid");

const db = require("../connect");
const UserModel = require("../models/user.model");
const users = require("../../../ext-data/users");
const weeklyCalendarHelper = require("weekly-calendar-helper");

async function getItem(oldItem) {
  const currentQuery = UserModel.findOne({ email: oldItem });
  return await currentQuery.exec();
}

async function addItem(item) {
  item._id = new mongoose.Types.ObjectId();
  var newModel = new UserModel(item);
  var newUser = null;
  try {
    newUser = await newModel.save(function(error) {
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }
  return newUser;
}

async function addData() {
  for (var i in users.users) {
    const oldItem = users.users[i];
    let currentLink = await getItem(oldItem);
    if (currentLink) {
      continue;
    }

    try {
      const newItem = {};

      newItem._id = new mongoose.Types.ObjectId();
      newItem.email = oldItem;
      newItem.firstName = oldItem.split("@")[0];
      newItem.lastName = "";
      newItem.password = Guid.raw();
      newItem.username = `dnwu${i}`;
      newItem.twitter = "";
      newItem.github = "";
      newItem.guid = Guid.raw();
      newItem.resetPassword = Guid.raw();
      newItem.resetEmail = Guid.raw();
      newItem.createdOn = weeklyCalendarHelper.baseHelper.getUtcNow();
      newItem.isActive = true;
      newItem.isAdmin = false;
      newItem.subscribed = true;
      newItem.keyUnsubscribe = Guid.raw();

      await addItem(newItem);
    } catch (ex) {
      console.log(ex);
    }
  }
}

addData();

module.exports = "";
