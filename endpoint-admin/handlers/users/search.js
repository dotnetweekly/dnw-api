const sanitize = require('mongo-sanitize');
const User = require("../../../db/models/user.model");

const search = function(req, callback) {
  const page = sanitize(req.query) ? sanitize(req.query.page) || 1 : 1;
  const email = sanitize(req.query.email) || "";
  const pageChunk = 12;

  const searchQuery = {};

  if (email) {
    const regexSearch = new RegExp(`.*?${email}.*?`);
    searchQuery.email = { $regex: regexSearch, $options: 'i' }
  }

  User.count({}, function(err, totalItems){

    const pages = Math.ceil(parseFloat(totalItems) / pageChunk);
    const skipItems = (page - 1) * pageChunk;
    var query = User.find(searchQuery)
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
