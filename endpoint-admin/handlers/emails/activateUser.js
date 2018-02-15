var Link = require('../../../db/models/link.model');
var CalendarHelper = require('../../../helpers/calendar.helper');
var config = require('../../../config');
var axios = require('axios');

const activateUser = function(req, callback) {
  axios
  .get(`${config.newsletterDomain}api/v1/user/activate`)
  .then((response) => {
    callback.onSuccess(response.data.data);
  })
  .catch((error) => {
    callback.onError(error);
  });
};

module.exports = activateUser;
