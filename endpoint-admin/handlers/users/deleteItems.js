const mongoose = require("mongoose");
const sanitize = require('mongo-sanitize');
const Schema = mongoose.Schema;
const User = require("../../../db/models/user.model");

const deleteItems = function(req, callback) {
  const ids = sanitize(req.body.ids);

  if (!Array.isArray(ids) || ids.length === 0) {
    callback.onError();
  }

  var updates = [];
  ids.forEach(function(id) {
    const updatePromise = new Promise((resolve, reject) => {
      User.remove({ _id: id }, function(err) {
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
