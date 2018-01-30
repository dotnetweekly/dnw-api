const mongoose = require("mongoose");
const sanitize = require('mongo-sanitize');
const Schema = mongoose.Schema;
const Category = require("../../../db/models/category.model");

const updateStatus = function(req, callback) {
  const updatedCategory = sanitize(req.body);

  if (!updatedCategory._id) {
    updatedCategory._id = mongoose.Types.ObjectId();
  }

  const updatePromise = new Promise((resolve, reject) => {
    const idOptions = { _id: updatedCategory._id };
    Category.update(
      idOptions,
      { $set: updatedCategory },
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
