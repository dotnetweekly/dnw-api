const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LinkComment = require("../../../db/models/comment.model");

const updateItems = function(req, callback) {
  const key = req.params.key;
  const ids = req.body.ids;
  const value = req.body.value;

  if (!Array.isArray(ids) || ids.length === 0) {
    callback.onError();
  }

  var updates = [];
  ids.forEach(function(id) {
    const updatePromise = new Promise((resolve, reject) => {
      LinkComment.findOneAndUpdate(
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

module.exports = updateItems;
