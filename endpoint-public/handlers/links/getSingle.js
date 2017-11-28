var Link = require("../../../db/models/link.model");

const getSingle = function (req, callback) {
    var query = Link.findOne({ slug: req.params.id }, [
        "_id",
        "title",
        "url",
        "content",
        "createdOn",
        "slug",
        "upvotes",
        "createdOn"
    ]);

    query
        .populate("category", "slug")
        .populate("tags")
        .populate("comments")
        .populate("user", "username");

    query.exec(function (err, data) {
        if (err) {
            callback.onError();
            return;
        } else {
            callback.onSuccess(data);
        }
    });
};

module.exports = getSingle;
