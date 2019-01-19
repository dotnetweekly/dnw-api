const newsletterLog = require("./newsletterLog");

const newsletterSent = function(req, callback) {
  newsletterLog(req, callback, "newsletterSent");
};

module.exports = newsletterSent;
