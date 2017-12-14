var Link = require('../../../db/models/link.model');
var CommentModel = require('../../../db/models/comment.model');

const getSingle = function(req, callback) {
	const userId = callback.user ? callback.user.id : null;

  var query = Link.findOne({ isActive: true, _id: req.params.id });
  const commentData = req.body.comment;

	query.exec(function(err, data) {
		if (err) {
			callback.onError();

			return;
		} else {
			if(data){
        const errors = [];
        if (!commentData) {
          errors.push({
            field: 'comment',
            error: 'Comment is empty'
          });

          callback.onSuccess({ errors });

          return;
        }

        if (commentData.length > 1000) {
          errors.push({
            field: 'comment',
            error: 'Comment has to be shorter than 1000 characters'
          });
          
          callback.onSuccess({ errors });

          return;
        }

        const comment = new CommentModel({
          content: commentData,
          isActive: false,
          user: callback.user,
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

				return;
			}

			callback.onError("No link found");

			return;
		}
	});
};

module.exports = getSingle;
