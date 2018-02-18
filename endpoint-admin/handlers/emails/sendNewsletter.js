
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

const sendEmailToUsers = function(html, params, callback, {week, year}){
  var query = User.find({});
  var promises = [];
  query.exec(function(err, users) {
    if (err) {
      callback.onError([]);
      return;
    } else {
      for (var i = 0; i < users.length; i++) {
        const user = users[i];
        const userHtml = EmailHelper.replaceVars(html, user);
        emailSender.send(user.email, params.subject, userHtml, `DNW-${year}-${week}`);
      }
      callback.onSuccess({});
      return;
    }
  });
}

const sendNewsletter = function(req, callback) {
  const now = new Date(Date.now());
  let week = sanitize(req.query.week);
  let year = sanitize(req.query.year);

  if (!week || !year) {
    week = CalendarHelper.getWeek(now);
    year = now.getFullYear();
  }

  axios.get(`${config.newsletterDomain}issues/${year}/${week}/`)
  .then((response) => {
    if(response && response.data){
      sendEmailToUsers(response.data, req.body, callback, {week, year});
    }
  })
};

module.exports = sendNewsletter;
