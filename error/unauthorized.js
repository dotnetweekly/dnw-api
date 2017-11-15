const BaseError = require("./base");

class UnauthorizedError extends BaseError {
  constructor(message) {
    message = message || "Invalid credentials";
    super(message, 401);
  }
}

module.exports = UnauthorizedError;
