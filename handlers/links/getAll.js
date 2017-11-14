const getAll = function(req, callback) {
  var query = Link.find({}, [
    "title",
    "content",
    "tags",
    "url",
    "user",
    "category"
  ]);

  query
    .populate("category")
    .populate("user")
    .sort({ title: "desc" })
    .limit(12)
    .exec(function(err, results) {
      res.json(results);
    });

  new Promise(function(resolve, reject) {
    query.exec(function(err, posts) {
      if (err !== null) {
        reject(err);
      } else {
        resolve(posts);
      }
    });
  })
    .then(posts => {
      callback.onSuccess(posts);
    })
    .catch(error => {
      callback.onError(error);
    });
};

module.exports = getAll;
