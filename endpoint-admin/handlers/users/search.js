const sanitize = require('mongo-sanitize');
const User = require("../../../db/models/user.model");

const search = function(req, callback) {
  const page = sanitize(req.query) ? sanitize(req.query.page) || 1 : 1;
  const email = sanitize(req.params.email);
  const pageChunk = 12;

  User.count({}, function(err, totalItems){

    const pages = Math.ceil(parseFloat(totalItems) / pageChunk);
    const skipItems = (page - 1) * pageChunk;
    var query = User.find({})
    .limit(pageChunk)
    .skip(skipItems)
    .sort({createdOn: "desc"});
  
    query.exec(function(err, data) {
      if (err) {
        callback.onError([]);
        return;
      } else {
        callback.onSuccess({
          items: data,
          pages: pages,
          page: page
        });
      }
    });
  })
};

module.exports = search;
