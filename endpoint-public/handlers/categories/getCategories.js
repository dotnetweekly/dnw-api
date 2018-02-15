const categories = require("../../../data/categories");

const getCategories = function(req, callback) {
  callback.onSuccess(categories);

  return;
};

module.exports = getCategories;
