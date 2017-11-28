const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Link = require("../../../db/models/link.model");

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

const updateItems = function (req, callback) {
  const key = req.params.key;
  const linkId = req.params.link;

  const ids = req.body.ids;
  const value = req.body.value;

  if (!Array.isArray(ids) || ids.length === 0) {
    callback.onError();
  }

  getLink(linkId).then(link => {
    for (var i in ids) {
      const comment = link.comments.id(ids[i]);
      comment[key] = value;
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

}

module.exports = updateItems;
