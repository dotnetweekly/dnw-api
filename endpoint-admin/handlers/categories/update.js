const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = require("../../../db/models/category.model");

const updateStatus = function(req, callback) {
  const ids = req.body.ids;
  const status = req.body.status;

  if (!Array.isArray(ids) || ids.length === 0) {
    callback.onError();
  }

  var updates = [];
  ids.forEach(function(id) {
    const updatePromise = new Promise((resolve, reject) => {
      Category.findOneAndUpdate(
        { _id: id },
        { $set: { isActive: status } },
        { upsert: true },
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

module.exports = updateStatus;
