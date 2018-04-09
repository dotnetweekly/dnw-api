const axios = require("axios");
const sanitize = require("mongo-sanitize");

const Link = require("../../../db/models/link.model");
const CalendarHelper = require("../../../helpers/calendar.helper");
const User = require("../../../db/models/user.model");
const config = require("../../../config");

const EmailModal = require("../../../email");
const ErrorHelper = require("../../../helpers/errors.helper");
const EmailHelper = require("../../../helpers/email.helper");

const emailSender = new EmailModal();

const sendEmailToUsers = async function(
  html,
  params,
  callback,
  { week, year },
  onlyAdmin
) {
  if (onlyAdmin || onlyAdmin === undefined) {
    emailSender.send(
      { list_id: "dnw-admins" },
      params.subject,
      html,
      `DNW-${year}-${week}`
    );
  } else {
    emailSender.send(
      { list_id: "dnw-subscribers" },
      params.subject,
      html,
      `DNW-${year}-${week}`
    );
  }
  callback.onSuccess({ usersCount: 0 });
};

const sendNewsletter = function(req, callback) {
  const onlyAdmin = req.query.onlyAdmin ? sanitize(req.query.onlyAdmin) : false;

  const now = CalendarHelper.getUtcNow();
  let week = sanitize(req.query.week);
  let year = sanitize(req.query.year);

  if (!week || !year) {
    week = parseInt(CalendarHelper.getWeek(now)) - 1;
    year = now.getFullYear();
  } else {
    week = parseInt(week) - 1;
  }

  axios
    .get(`${config.newsletterDomain}issues/${year}/${week}/`)
    .then(response => {
      if (response && response.data) {
        sendEmailToUsers(
          response.data,
          req.body,
          callback,
          { week, year },
          onlyAdmin
        );
      }
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = sendNewsletter;
