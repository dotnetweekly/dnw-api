const BaseAutoBindedClass = require("../../../helpers/base.autobind");
const getTags = require("./getTags");

class TagHandler extends BaseAutoBindedClass {
  constructor() {
    super();
    this.getTags = (req, callback) => getTags(req, callback);
  }
}

module.exports = TagHandler;
