
const axios = require('axios');

const Link = require('../../../db/models/link.model');
const CalendarHelper = require('../../../helpers/calendar.helper');
const User = require("../../../db/models/user.model");
const config = require('../../../config');

const EmailModal = require("../../../email");
const ErrorHelper = require("../../../helpers/errors.helper");
const EmailHelper = require("../../../helpers/email.helper");

const emailSender = new EmailModal();

const sendEmailToUsers = function(html, params, callback){
  var query = User.find({});
  var promises = [];
  query.exec(function(err, users, callback) {
    if (err) {
      callback.onError([]);
      return;
    } else {
      for (var i = 0; i < users.length; i++) {
        const user = users[i];
        const userHtml = EmailHelper.replaceVars(html, user);
        promises.push(emailSender.send([user.email], params.subject, userHtml));
      }
      Promise.all(promises).then(() => {
        callback.onSuccess({});
      }).catch(err => {
        console.log(err);
      })
    }
  });
}

const sendCustom = function(req, callback) {
  axios.get(`${config.newsletterDomain}api/v1/email/template`, { params: req.body.params } )
  .then((response) => {
    sendEmailToUsers(response.data.data, req.body.params, callback);
  })
};

module.exports = sendCustom;
