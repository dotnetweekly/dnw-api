const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AdModel = require("../../../db/models/ad.model");
const sanitize = require('mongo-sanitize');

const updateStatus = function(req, callback) {
  const updatedAd = sanitize(req.body);

  if (!updatedAd._id) {
    updatedAd._id = mongoose.Types.ObjectId();
  }

  const updatePromise = new Promise((resolve, reject) => {
    const idOptions = { _id: updatedAd._id };
    AdModel.update(
      idOptions,
      { $set: updatedAd },
      { upsert: true },
      function(err) {
        if (err) reject(err);
        resolve();
      }
    );
  });

  updatePromise
    .then(function() {
      callback.onSuccess();
    })
    .catch(function(err) {
      callback.onError(err);
      return;
    });
};

module.exports = updateStatus;
