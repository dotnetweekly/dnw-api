const HttpStatus = require("http-status-codes");
const AuthHandler = require("./auth");
const UserHelper = require("../../helpers/user.helper");
const UnauthorizedError = require("../../error/unauthorized");

const BasicResponse = {
  success: false,
  message: "",
  data: {}
};

class ResponseManager {
  constructor() { }

  static get HTTP_STATUS() {
    return HttpStatus;
  }

  static authenticate(req, res) {
    const authHandler = new AuthHandler();
    const payload = authHandler.validate(req);
    const unauthorizedError = new UnauthorizedError();

    if (payload === null) {
      ResponseManager.respondWithError(
        res,
        unauthorizedError.status
      );
      return;
    }

    return payload.data;
  }

  static getResponseHandler(req, res, noAuth = false) {
    let user = null;

    if (!noAuth) {
      user = ResponseManager.authenticate(req, res);
      if (!user) {
        return null;
      }
    }

    return {
      user: user,
      onSuccess: function (data, message, code) {
        ResponseManager.respondWithSuccess(
          res,
          code || ResponseManager.HTTP_STATUS.OK,
          data,
          message
        );
      },
      onError: function (error) {
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
