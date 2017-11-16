var Category = require("../../../db/models/category.model");

const changeStatus = function(req, callback) {
  const ids = req.body.ids;
  const status = req.body.status;

  var updates = [];
  ids.forEach(function(obj) {
    var updatePromise = Category.update(
      { _id: ObjectId(obj._id) },
      { $set: { isActive: status } }
    );
    updates.push(updatePromise);
  });

  Promise.all(updates)
    .then(function(results) {
      callback.onSuccess(results);
    })
    .catch(function() {
      callback.onError();
      return;
    });
};

module.exports = changeStatus;
