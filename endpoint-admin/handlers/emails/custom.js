
const axios = require('axios');
const sanitize = require('mongo-sanitize');

const Link = require('../../../db/models/link.model');
const CalendarHelper = require('../../../helpers/calendar.helper');
const User = require("../../../db/models/user.model");
const config = require('../../../config');

const EmailModal = require("../../../email");
const ErrorHelper = require("../../../helpers/errors.helper");
const EmailHelper = require("../../../helpers/email.helper");

const emailSender = new EmailModal();

const sendEmailToUsers = function(html, params, callback, onlyAdmin){
  var query = User.find({});
  if (onlyAdmin) {
    query = User.find({ isAdmin: true });
  }
  var promises = [];
  query.exec(function(err, users) {
    if (err) {
      callback.onError([]);
      return;
    } else {
      for (var i = 0; i < users.length; i++) {
        const user = users[i];
        const userHtml = EmailHelper.replaceVars(html, user);
        emailSender.send(user.email, params.subject, userHtml);
      }
      callback.onSuccess({usersCount: users.length});
      return;
    }
  });
}

const sendCustom = function(req, callback) {
  const onlyAdmin = req.query.onlyAdmin ? sanitize(req.query.onlyAdmin) : false;
  axios.get(`${config.newsletterDomain}api/v1/email/template`, { params: req.body } )
  .then((response) => {
    sendEmailToUsers(response.data.data, req.body, callback, onlyAdmin);
  })
};

module.exports = sendCustom;
