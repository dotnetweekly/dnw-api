
const jwt = require('jsonwebtoken');
const axios = require("axios");
const sanitize = require('mongo-sanitize');

const config = require('../../../config');
const User = require('../../../db/models/user.model');
const NotFoundError = require('../../../error/not-found');
const EmailModal = require("../../../email");
const ErrorHelper = require("../../../helpers/errors.helper");

const emailSender = new EmailModal();

const updateUser = function(data, updatedUser, callback) {
  
  data.firstName = updatedUser.firstName;
  data.lastName = updatedUser.lastName;
  data.username = updatedUser.username;
  data.twitter = updatedUser.twitter;
  data.github = updatedUser.github;
  
  if (updatedUser.newPassword) {
    data.password = updatedUser.newPassword;
  }

  if(updatedUser.email !== data.email) {
		const token = jwt.sign(
			{
				email: updatedUser.email
			},
			config.auth.secret
		);
    data.resetEmail = token;
    sendUpdateEmail(updatedUser.email, token)
    .then(() => {
      updateUserAction(data, updatedUser, callback, `Please visit ${updatedUser.email} to update your email.`);
    })
    .catch(error => {
      callback.onSuccess({
        errors: [{
          field: "",
          error: error
        }]
      });
    })
  } else {
    updateUserAction(data, updatedUser, callback);
  }
}

const updateUserAction = function(data, updatedUser, callback, successMessage) {
  data.save(function(err){
    if(!err){
      callback.onSuccess({
        successMessage
      });

      return;
    } else {
      callback.onSuccess({ errors: ErrorHelper.formatErrors(err) });
      
      return;
    }
  })
}

const sendUpdateEmail = function(email, token) {
	return new Promise((resolve, reject) => {
		axios
		.get(`${config.newsletterDomain}api/v1/user/updateEmail?token=${token}`)
		.then((response) => {
      emailSender.send(email, "[Call to action] Update your email", response.data.data);
      callback.onSuccess({});
			resolve();
		})
		.catch((error) => {
			reject(error);
		});
	})
}

const checkPassword = function(data, updatedUser, callback){
  return new Promise((resolve, reject) => {
    let errors = [];
    if (!updatedUser.newPassword) {
      resolve();
    } else {
      if(updatedUser.newPassword.length < 8) {
        errors.push({
          field: 'newPassword',
          error: 'password has to be at least 8 characters'
        });
        callback.onSuccess({ errors });
    
        reject();

        return;
      } else {
        resolve();

        return;
      }
    }
  });
}

const checkUsername = function(data, updatedUser, callback){
  return new Promise((resolve, reject) => {
    let errors = [];
    if(!updatedUser.username || updatedUser.username.length < 6){
      errors.push({
        field: 'username',
        error: 'username has to be at least 5 characters'
      });
      callback.onSuccess({ errors });
  
      reject();
    }
    
    if(data.username !== updatedUser.username){
      User.findOne({ username: updatedUser.username  }, function(error, user) {
        if(error || user){
          errors.push({
            field: 'username',
            error: 'username already taken'
          });
          callback.onSuccess({ errors });
  
          return;
        } else {
          resolve();
        }
      });
    } else {
      resolve();
    }
  })
}

const saveProfile = function(req, callback) {
	var query = User.findOne({ _id: callback.user.id, isActive: true });
  const updatedUser = sanitize(req.body);
	query.exec(function(err, data) {
		if (err || !data) {
      callback.onError({});
      
			return;
		} else {
			if (data) {
        checkUsername(data, updatedUser, callback)
        .then(() => {
          return checkPassword(data, updatedUser, callback);
        }).then(() => {
          updateUser(data, updatedUser, callback);
        }).catch(error => {
          callback.onError({ errors: [
            {
              field: "",
              error: error
            }
          ]});

          return;
        })
			} else {
        callback.onError(new NotFoundError());
        
        return;
      }
		}
	});
};

module.exports = saveProfile;
