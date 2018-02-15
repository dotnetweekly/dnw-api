const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Link = require("../../../db/models/link.model");
const sanitize = require('mongo-sanitize');

const getComments = function (ids) {
  return new Promise((resolve, reject) => {
    const links = [];
    let count = 0;

    for (var i = 0; i < ids.length; i++) {
      const id = ids[i];
      searchParams = {
        "comments._id": id
      }
      let query = Link.findOne(searchParams);
      (function(i, id, query){ 
        query.exec(function (err, data) {
        count++;
        links.push(data);
        if (count === ids.length) {
          resolve(links);
        }
        })
      })(i, id, query);
    }
  });
}

const updateItems = function (req, callback) {
  const key = sanitize(req.params.key);

  const ids = sanitize(req.body.ids);
  const value = sanitize(req.body.value);

  if (!Array.isArray(ids) || ids.length === 0) {
    callback.onError();
  }

  getComments(ids).then(links => {
    const errors = [];
    let count = 0;

    for (var i = 0; i < links.length; i++) {
      const link = links[i];
      (function (link, ids) {
        for (var i in ids) {
          link.comments.id(ids[i]).remove();
        }
        link.save(function (err) {
          count++;
          if (count === links.length) {
            callback.onSuccess();
          }
        })
      })(link, ids);
    }
  }).catch(err => {
    callback.onError(err);
  });

}

module.exports = updateItems;
