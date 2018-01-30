const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AdModel = require("../../../db/models/ad.model");
const sanitize = require('mongo-sanitize');

const update = function(req, callback) {
  const key = sanitize(req.params.key);
  const ids = sanitize(req.body.ids);
  const value = sanitize(req.body.value);

  if (!Array.isArray(ids) || ids.length === 0) {
    callback.onError();
  }

  var updates = [];
  ids.forEach(function(id) {
    const updatePromise = new Promise((resolve, reject) => {
      AdModel.findOneAndUpdate(
        { _id: id },
        { $set: { [key]: value } },
        function(err) {
          if (err) reject(err);
          resolve();
        }
      );
    });
    updates.push(updatePromise);
  });

  Promise.all(updates)
    .then(function() {
      callback.onSuccess();
    })
    .catch(function(err) {
      callback.onError(err);
      return;
    });
};

module.exports = update;
