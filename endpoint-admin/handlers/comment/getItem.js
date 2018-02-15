const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Link = require("../../../db/models/link.model");
const sanitize = require('mongo-sanitize');

const getLink = function (link) {
  return new Promise((resolve, reject) => {
    var query = Link.findOne({ _id: link })
      .populate("user", "username");

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

const search = function (req, callback) {
  const id = sanitize(req.params.id);
  if (!id) {
    callback.onError("Not Found");
    return;
  }

  getLink(sanitize(req.params.link))
    .then(link => {

      const comments = link.comments
        .filter(comment => { return comment._id == id });

      callback.onSuccess(comments[0]);
    });
};

module.exports = search;
