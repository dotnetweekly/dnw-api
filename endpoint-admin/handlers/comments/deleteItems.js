const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Link = require("../../../db/models/link.model");
const sanitize = require('mongo-sanitize');

const getLink = function (link) {
  return new Promise((resolve, reject) => {
    var query = Link.findOne({ _id: link });

    query.exec(function (err, data) {
      if (err) {
        reject(err);
        return;
      } else {
        resolve(data);
      }
    });
  });
}

const deleteItems = function (req, callback) {
  const ids = sanitize(req.body.ids);

  if (!Array.isArray(ids) || ids.length === 0) {
    callback.onError();
  }

  getLink(sanitize(req.params.link))
    .then(link => {
      for (var i in ids) {
        link.comments.id(ids[i]).remove();
      }

      link.save(function (err) {
        if (err) {
          callback.onError(err);
          return;
        }
        callback.onSuccess();
      });
    }).catch(err => {
      callback.onError(err);
    });
};

module.exports = deleteItems;
