var LinkComment = require("../../../db/models/comment.model");
var mongoose = require('mongoose');

const getLinkComments = function (req, callback) {
    var query = LinkComment.find({ link: mongoose.Types.ObjectId(req.params.id) }, ["_id", "content"]);

    query
        .populate("link")
        .populate("children", "_id")
        .populate("children", "content")
        .populate("user", "username")
        .sort({ createdOn: "desc" });

    query.exec(function (err, data) {
        if (err) {
            callback.onError([]);
            return;
        } else {
            callback.onSuccess(data);
        }
    });
};

module.exports = getLinkComments;
