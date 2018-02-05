const BaseController = require("./base.controller");
const AuthHandler = require("../handlers/auth");
const RecaptchaError = require("../../error/recaptcha");

class AuthController extends BaseController {
  constructor() {
    super();
    this._handler = new AuthHandler();
  }

  login(req, res, next) {
    const response = this._responseManager.getResponseHandler(req, res, true);

    if (req.recaptcha.error) {
      response.onError(new UnauthorizedError());

      return;
    }

    this._handler.authenticate(req, response);
  }

  register(req, res, next) {
    const response = this._responseManager.getResponseHandler(req, res, true);

    if (req.recaptcha.error) {
      const recaptchaError = new RecaptchaError();
      response.onSuccess({
        errors: [{field: "recaptcha", error: recaptchaError.message}]
      });

      return;
    }
    
    this._handler.register(req, response);
  }

  activate(req, res, next) {
    const response = this._responseManager.getResponseHandler(req, res, true);

    if (req.recaptcha.error) {
      const recaptchaError = new RecaptchaError();
      response.onSuccess({
        errors: [{field: "recaptcha", error: recaptchaError.message}]
      });

      return;
    }
    
    this._handler.activate(req, response);
  }

  forgotPasswordActivate(req, res, next) {
    const response = this._responseManager.getResponseHandler(req, res, true);

    if (req.recaptcha.error) {
      const recaptchaError = new RecaptchaError();
      response.onSuccess({
        errors: [{field: "recaptcha", error: recaptchaError.message}]
      });

      return;
    }
    
    this._handler.forgotPasswordActivate(req, response);
  }
}

module.exports = AuthController;
