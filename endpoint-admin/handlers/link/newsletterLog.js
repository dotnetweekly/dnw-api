const mongoose = require("mongoose");
const sanitize = require("mongo-sanitize");
const Schema = mongoose.Schema;
const Link = require("../../../db/models/link.model");
const weeklyCalendarHelper = require("weekly-calendar-helper");

const updateData = function(data, callback, updateType) {
  return new Promise((resolve, reject) => {
    const idOptions = { _id: data._id };
    const updatedProperties = {};

    if (!data[updateType]) {
      updatedProperties[updateType] = 1;
    } else {
      updatedProperties[updateType] = data[updateType] + 1;
    }

    Link.update(
      idOptions,
      { $set: updatedProperties },
      { upsert: false },
      function(err) {
        console.log(err);
        if (err) {
          reject(err);
        }
        resolve();
      }
    );
  });
};

const newsletterLog = function(req, callback, updateType) {
  const itemToUpdate = sanitize(req.body);
  if (!itemToUpdate.campaign_id || !itemToUpdate.target_link_url) {
    callback.onError(itemToUpdate);
    return;
  }

  const subStringUrl = itemToUpdate.target_link_url.substring(
    0,
    itemToUpdate.target_link_url.indexOf("?") ||
      itemToUpdate.target_link_url.length - 1
  );

  const campaignParts = itemToUpdate.campaign_id.split("-");
  if (campaignParts.length < 3) {
    callback.onError("Campaign Not Found");
    return;
  }

  const dateRange = weeklyCalendarHelper.weekHelper.getDateRangeOfWeek(
    parseInt(campaignParts[2]),
    parseInt(campaignParts[1])
  );

  const queryOptions = {
    url: { $regex: `^${subStringUrl}*` },
    createdOn: {
      $gte: weeklyCalendarHelper.baseHelper.addDays(dateRange.from, -3),
      $lte: weeklyCalendarHelper.baseHelper.addDays(dateRange.to, 3)
    },
    isActive: true
  };

  var query = Link.findOne(queryOptions);

  query.exec(function(err, data) {
    if (err || !data) {
      callback.onError("Not Found");
    } else {
      console.log("Update Data");
      updateData(data, callback, updateType)
        .then(() => {
          callback.onSuccess(data[updateType] + 1);
        })
        .catch(() => {
          callback.onError("Error Updating");
        });
    }
  });
};

module.exports = newsletterLog;
