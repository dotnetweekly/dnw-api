const Link = require('../../../db/models/link.model');
const CommentModel = require('../../../db/models/comment.model');
const UserModel = require("../../../db/models/user.model");

const saveCommentAction = function(user, data, commentData, callback) {
  const errors = [];
  if (!commentData) {
    errors.push({
      field: 'comment',
      error: 'Comment is empty'
    });

    callback.onSuccess({ errors });

    return;
  }

  const comment = new CommentModel({
    content: commentData,
    isActive: false,
    user: user,
    createdOn: new Date(Date.now)
  });

  data.comments.push(comment);
  
  data.save(function (err) {
    if (err) {
      callback.onError(err);

      return;
    }
    callback.onSuccess({});

    return;
  });
}

const saveComment = function(req, callback) {
	const userId = callback.user ? callback.user.id : null;

  var query = Link.findOne({ isActive: true, _id: req.params.id });
  const commentData = req.body.comment;

	query.exec(function(err, link) {
		if (err) {
			callback.onError();

			return;
		} else {
      UserModel.findOne({ _id: userId }, function(error, user) {
        if (error || !user) {
          callback.onSuccess({ error: "User not found." });
          return;
        }

        saveCommentAction(user, link, commentData, callback);
      });
		}
	});
};

module.exports = saveComment;
