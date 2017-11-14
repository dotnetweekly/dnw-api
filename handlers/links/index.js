const BaseAutoBindedClass = require("../../base.autobind");
const getAll = require("./getAll");

class LinkHandler extends BaseAutoBindedClass {
  getAll(req, callback) {
    callback.onSuccess([{ id: 2 }]);
  }
}

module.exports = LinkHandler;
