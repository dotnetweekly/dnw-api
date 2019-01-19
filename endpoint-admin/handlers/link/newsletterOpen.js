const newsletterLog = require("./newsletterLog");

const newsletterOpen = function(req, callback) {
  newsletterLog(req, callback, "newsletterOpen");
};

module.exports = newsletterOpen;
