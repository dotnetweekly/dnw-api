const sanitize = require('mongo-sanitize');
const Guid = require("guid");
const UserModel = require("../../../db/models/user.model");

const NotFoundError = require("../../../error/not-found");
const UnauthorizedError = require("../../../error/unauthorized");

const userCount = function(req, callback) {
  UserModel.count({}, function(error, count) {
    callback.onSuccess(count);
  });
};

module.exports = userCount;
