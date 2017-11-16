const HttpStatus = require("http-status-codes");
const AuthHandler = require("./auth");

const BasicResponse = {
  success: false,
  message: "",
  data: {}
};

class ResponseManager {
  constructor() {}

  static get HTTP_STATUS() {
    return HttpStatus;
  }

  static authenticate(req, res) {
    const authHandler = new AuthHandler();
    const payload = authHandler.validate(req);
    const unauthorizedError = new UnauthorizedError();

    if (!payload) {
      res.status(unauthorizedError.status);
      return;
    }

    return payload.data;
  }

  static getResponseHandler(req, res, noAuth) {
    if (!noAuth && !authenticate(req, res)) {
      return null;
    }

    return {
      onSuccess: function(data, message, code) {
        ResponseManager.respondWithSuccess(
          res,
          code || ResponseManager.HTTP_STATUS.OK,
          data,
          message
        );
      },
      onError: function(error) {
        ResponseManager.respondWithError(
          res,
          error.status || 500,
          error.message || "Unknown error"
        );
      }
    };
  }

  static getResponseHandlerError(req, res, successCallback) {
    if (authenticate(req, res)) {
      return null;
    }

    return {
      onSuccess: function(data, message, code) {
        successCallback(data, message, code);
      },
      onError: function(error) {
        ResponseManager.respondWithError(
          res,
          error.status || 500,
          error.message || "Unknown error"
        );
      }
    };
  }

  static respondWithSuccess(res, code, data, message = "", links = []) {
    let response = Object.assign({}, BasicResponse);
    response.success = true;
    response.message = message;
    response.data = data;
    res.status(code).json(response);
  }

  static respondWithError(res, errorCode, message = "", links = []) {
    let response = Object.assign({}, BasicResponse);
    response.success = false;
    response.message = message;
    res.status(errorCode).json(response);
  }
}

module.exports = ResponseManager;
