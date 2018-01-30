const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Link = require("../../../db/models/link.model");
const sanitize = require('mongo-sanitize');

const getLink = function (link) {
  return new Promise((resolve, reject) => {
    var query = Link.findOne({ _id: link });

    query.exec(function (err, data) {
      if (err) {
        reject();
        return;
      } else {
        resolve(data);
      }
    });
  });
}

const updateItem = function (req, callback) {
  const itemToUpdate = sanitize(req.body);
  const id = sanitize(req.params.id);

  if (!itemToUpdate._id) {
    itemToUpdate._id = mongoose.Types.ObjectId();
  }

  getLink(sanitize(req.params.link))
    .then(link => {

      const comments = link.comments
        .filter(comment => { return comment._id == id });

      if (comments.length > 0) {
        for (var prop in itemToUpdate) {
          comments[0][prop] = itemToUpdate[prop];
        }
      } else {
        link.comments.push(itemToUpdate);
      }

      link.save(function (err) {
        if (err) {
          callback.onError(err);
          return;
        }
        callback.onSuccess();
      });
    }).catch(() => { callback.onError() });
};

module.exports = updateItem;
