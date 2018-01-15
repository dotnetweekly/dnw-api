const BaseAutoBindedClass = require("../../../helpers/base.autobind");
const search = require("./search");
const update = require("./update");
const deleteAds = require("./delete");

class AdsHandler extends BaseAutoBindedClass {
  constructor() {
    super();
    this.search = (req, callback) => search(req, callback);
    this.update = (req, callback) => update(req, callback);
    this.deleteAds = (req, callback) => deleteAds(req, callback);
  }
}

module.exports = AdsHandler;
