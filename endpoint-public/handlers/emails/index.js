const BaseAutoBindedClass = require('../../../helpers/base.autobind');
const currentNewsletter = require('./currentNewsletter');
const sponsoredCount = require('./sponsoredCount');

class LinkHandler extends BaseAutoBindedClass {
  constructor() {
    super();
    this.currentNewsletter = (req, callback) => currentNewsletter(req, callback);
    this.sponsoredCount = (req, callback) => sponsoredCount(req, callback);
  }
}

module.exports = LinkHandler;
