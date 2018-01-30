const mongoose = require("mongoose");
const sanitize = require('mongo-sanitize');
const Schema = mongoose.Schema;
const User = require("../../../db/models/user.model");

const updateItem = function(req, callback) {
  const itemToUpdate = sanitize(req.body);

  if (!itemToUpdate._id) {
    itemToUpdate._id = mongoose.Types.ObjectId();
  }

  const updatePromise = new Promise((resolve, reject) => {
    const idOptions = { _id: itemToUpdate._id };
    User.update(idOptions, { $set: itemToUpdate }, { upsert: true }, function(
      err
    ) {
      if (err) reject(err);
      resolve();
    });
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

module.exports = updateItem;
