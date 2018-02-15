const tags = require("../../../data/tags");

const getTags = function(req, callback) {
  callback.onSuccess(tags);
};

module.exports = getTags;
