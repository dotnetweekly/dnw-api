const BaseError = require("./base");

class UnauthorizedError extends BaseError {
  constructor(message, errors) {
    message = message || "Invalid credentials";
    super(message, 401, errors);
  }
}

module.exports = UnauthorizedError;
