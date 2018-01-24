var CategoryModel = require("../../../db/models/category.model");

const getCategories = function(req, callback) {
  var query = CategoryModel.find({ isActive: true }, ["_id", "name", "slug"]);

  query.exec(function(err, data) {
    if (err) {
      callback.onError([]);
      return;
    } else {
      callback.onSuccess(data.filter(tag => {
        return (
          [
            "articles",
            "books",
            "events-training",
            "libraries-tools",
            "videos"
          ].indexOf(tag.slug) > -1
        );
      }));
    }
  });
};

module.exports = getCategories;
