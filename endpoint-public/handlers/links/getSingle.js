const sanitize = require('mongo-sanitize');
const Feed = require('feed');

var Link = require('../../../db/models/link.model');
const config = require("../../../config/");

const getSingle = function(req, callback) {
	const userId = callback.user ? callback.user.id : null;
	const rss = req.query.feed;

	var query = Link.findOne({ isActive: true, slug: sanitize(req.params.id) }, [
		'_id',
		'title',
		'url',
		'content',
		'createdOn',
		'slug',
		'category',
		'tags',
		'upvotes',
		'createdOn'
	]);

	query
		.populate({ path: 'comments.user', select: 'username' })
		.populate({ path: 'comments', select: 'content' })
		.populate('user', 'username');

	query.exec(function(err, data) {
		if (err) {
			callback.onError();

			return;
		} else {
			if(data){

				let link = data._doc;

				link.upvoteCount = link.upvotes.length;
				link.hasUpvoted = link.upvotes.some(upvote => {
					return !userId ? false : upvote.trim() == userId.trim() 
				});
				link.comments = link.comments.filter(link => {
					return link.isActive;
				})
				link.upvotes = [];

				if (rss) {
					callback.onSuccess("", "", "",
						getFeed(data)
					);
	
					return;
				}

				callback.onSuccess(link);

				return;
			}

			callback.onError("No link found");

			return;
		}
	});
};

function getFeed(link) {
  var feed = new Feed({
		title:  link.title,
		id: `${config.clientDomain}articles/${link.slug}`,
		link: `${config.clientDomain}articles/${link.slug}`,
		date: link.createdOn,
		content: link.content
  });
  return feed.atom1();
}

module.exports = getSingle;
