const jwt = require('jsonwebtoken');
const sanitize = require('mongo-sanitize');
const config = require('../../../config');
const UserModel = require('../../../db/models/user.model');

const NotFoundError = require('../../../error/not-found');
const UnauthorizedError = require('../../../error/unauthorized');
const stringHelper = require("../../../helpers/string.helper");

const noKeyStr = `To update your email please visit the <a href="/profile">profile</a> page.`;
let existsKeyStr = 'User with the email {0} already exists. Visit the <a href="/forgot-password">forgot password</a> page.';

const updateEmailAction = function(currentToken, user, callback){
  const newToken = jwt.sign(
    {
      email: currentToken.email
    },
    config.auth.secret
  );
  
  user.resetEmail = newToken;
  user.email = currentToken.email;
  user.save(function(err) {

    callback.onSuccess({});
    
    return;
  });
}

const activate = function(req, callback) {
	const key = sanitize(req.body.key);
	UserModel.findOne({ resetEmail: key, isActive: true }, function(error, user) {
		if (error || !user) {
			callback.onSuccess({ error: noKeyStr });
			return;
		}
    
    const currentToken = jwt.verify(key, config.auth.secret, {
      ignoreExpiration: true
    });
  
    if (!currentToken || !currentToken.email) {
      callback.onSuccess({ error: noKeyStr });
      
      return;
    }

    UserModel.findOne({ email: currentToken.email }, function(error, existingUser){
      if (error || existingUser) {
        callback.onSuccess({ error: stringHelper.format(existsKeyStr, [currentToken.email]) });

        return;
      }

      updateEmailAction(currentToken, user, callback);

      return;
    });

	});
};

module.exports = activate;
