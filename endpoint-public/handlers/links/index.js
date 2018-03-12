const BaseAutoBindedClass = require('../../../helpers/base.autobind');
const search = require('./search');
const getSingle = require('./getSingle');
const upvote = require('./upvote');
const downvote = require('./downvote');
const comment = require('./comment');
const add = require('./add');
const getMeta = require('./getMeta');

class LinkHandler extends BaseAutoBindedClass {
	constructor() {
		super();
		this.search = (req, callback) => search(req, callback);
		this.getSingle = (req, callback) => getSingle(req, callback);
		this.upvote = (req, callback) => upvote(req, callback);
		this.downvote = (req, callback) => downvote(req, callback);
		this.comment = (req, callback) => comment(req, callback);
		this.add = (req, callback) => add(req, callback);
		this.getMeta = (req, callback) => getMeta(req, callback);
	}
}

module.exports = LinkHandler;
