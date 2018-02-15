const categories = require("../../../data/categories");

const search = function(req, callback) {
  callback.onSuccess(categories);

  return;
};

module.exports = search;
