const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Tag = require("../../../db/models/tag.model");

const deleteItems = function(req, callback) {
  const ids = req.body.ids;

  if (!Array.isArray(ids) || ids.length === 0) {
    callback.onError();
  }

  var updates = [];
  ids.forEach(function(id) {
    const updatePromise = new Promise((resolve, reject) => {
      Tag.remove({ _id: id }, function(err) {
        if (err) reject(err);
        resolve();
      });
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

module.exports = deleteItems;
