const User = require('../../../db/models/user.model');
const NotFoundError = require('../../../error/not-found');
const ErrorHelper = require("../../../helpers/errors.helper");

const updateUser = function(data, updatedUser, callback) {
  
  data.firstName = updatedUser.firstName;
  data.lastName = updatedUser.lastName;
  data.username = updatedUser.username;
  data.twitter = updatedUser.twitter;
  data.github = updatedUser.github;
  data.subscribed = updatedUser.subscribed;
  
  if (!updatedUser.password) {
    data.password = updatedUser.password;
  }

  data.save(function(err){
    if(!err){
      callback.onSuccess({});

      return;
    } else {
      callback.onSuccess({ errors: ErrorHelper.formatErrors(err) });
      
      return;
    }
  })
}

const checkPassword = function(data, updatedUser, callback){
  return new Promise((resolve, reject) => {
    let errors = [];
    if (!updatedUser.password) {
      resolve();
    } else {
      if(updatedUser.password.length < 8) {
        errors.push({
          field: 'password',
          error: 'password has to be at least 8 characters'
        });
        callback.onSuccess({ errors });
    
        reject();
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
  const updatedUser = req.body;
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
