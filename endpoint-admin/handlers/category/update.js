const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = require("../../../db/models/category.model");

const updateStatus = function(req, callback) {
  const updatedCategory = req.body;

  const updatePromise = new Promise((resolve, reject) => {
    Category.findOneAndUpdate(
      { _id: id },
      { $set: updatedCategory },
      { upsert: true },
      function(err) {
        if (err) reject(err);
        resolve();
      }
    );
  });

  updatePromise()
    .then(function() {
      callback.onSuccess();
    })
    .catch(function(err) {
      callback.onError(err);
      return;
    });
};

module.exports = updateStatus;
