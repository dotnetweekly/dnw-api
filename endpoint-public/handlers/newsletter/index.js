const BaseAutoBindedClass = require('../../../helpers/base.autobind');
const search = require('./search');

class LinkHandler extends BaseAutoBindedClass {
	constructor() {
		super();
		this.search = (req, callback) => search(req, callback);
	}
}

module.exports = LinkHandler;
