const BaseError = require("./base");

class NotFoundError extends BaseError {
  constructor(message) {
    message = message || "User not found";
    super(message, 404);
  }
}

module.exports = NotFoundError;
