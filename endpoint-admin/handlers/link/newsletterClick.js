const newsletterLog = require("./newsletterLog");

const newsletterClick = function(req, callback) {
  newsletterLog(req, callback, "newsletterClick");
};

module.exports = newsletterClick;
