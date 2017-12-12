const SparkPost = require('sparkpost');
const environment = require("../ext-data/environment.json");
const client = new SparkPost(environment.sparkPost);

class Email {
  send(recipients, subject, html) {

    const addresses = recipients.map(recipient => {
      return {address: recipient}
    });

    return new Promise((resolve, reject) => {
      client.transmissions.send({
        options: {
          sandbox: false
        },
        content: {
          from: 'info@dotnetweekly.com',
          subject: subject,
          html: html
        },
        recipients: addresses
      })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
    })
  }
}

module.exports = Email;
