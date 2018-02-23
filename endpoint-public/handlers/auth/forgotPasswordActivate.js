const sanitize = require('mongo-sanitize');
const Guid = require("guid");
const UserModel = require("../../../db/models/user.model");
const NotFoundError = require("../../../error/not-found");
const UnauthorizedError = require("../../../error/unauthorized");

const forgotPasswordActivate = function(req, callback) {
  const key = sanitize(req.params.key);
  const password = sanitize(req.body.password);

  UserModel.findOne({ resetPassword: key, isActive: true }, function(
    error,
    user
  ) {
    if (error) {
      callback.onSuccess({ errors: ErrorHelper.formatErrors(error) });

      return;
    }

    if (!user) {
      callback.onSuccess({
        errors: [
          {
            field: "password",
            error:
              "Change Password key now found. Please visit the <a href='/forgot-password'>forgot password</a> page."
          }
        ]
      });
      return;
    }

    user.password = password;
    user.resetPassword = Guid.raw();
    user.save(function(err) {
      if (err) {
        callback.onSuccess({ errors: ErrorHelper.formatErrors(err) });

        return;
      }

      callback.onSuccess({});
    });
  });
};

module.exports = forgotPasswordActivate;
