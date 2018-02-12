const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Link = require("../../../db/models/link.model");
const sanitize = require('mongo-sanitize');

const getLink = function (id) {
  return new Promise((resolve, reject) => {
    var query = Link.findOne({ "comments._id": id })
      .populate("comments")
      .populate("comments.user");

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

  getLink(sanitize(req.params.id))
    .then(link => {

      const comments = link.comments
        .filter(comment => { return comment._id == id });

      callback.onSuccess({comment: comments[0], linkId: link._id});
    }).catch(error => {
      console.log(error);
    });
};

module.exports = search;
