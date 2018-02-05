const BaseError = require("./base");

class InvalidRecaptcha extends BaseError {
  constructor(message) {
    message = message || "Invalid captcha key";
    super(message, 403);
  }
}

module.exports = InvalidRecaptcha;
