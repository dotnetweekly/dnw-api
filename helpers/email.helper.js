const config = require("../config");

const emailHelper = {
  replaceVars: function(html, user) {
    
    let newHtml = html;

    newHtml = newHtml.replace(/(\${USER_UNSUBSCRIBE})/gim, `${config.clientDomain}unsubscribe/${user.keyUnsubscribe}`);
    newHtml = newHtml.replace(/(\${USER_USERNAME})/gim, user.username);
    newHtml = newHtml.replace(/(\${USER_RESET})/gim, `${config.clientDomain}resetPassword/${user.resetPassword}`);
    newHtml = newHtml.replace(/(\${USER_FISTNAME})/gim, user.firstName);
    newHtml = newHtml.replace(/(\$DOMAIN_CLIENT)/gim, config.clientDomain);

    return newHtml;
  }
}

module.exports = emailHelper;