const SparkPost = require("sparkpost");

let sparkPostKey = process.env.SPARKPOST;

if (!sparkPostKey) {
  const envirnoment = require("../ext-data/environment.json");
  sparkPostKey = envirnoment.sparkPost;
}

const client = new SparkPost(sparkPostKey);

class Email {
  send(recipients, subject, html) {
    const addresses = recipients.map(recipient => {
      return { address: recipient };
    });

    return new Promise((resolve, reject) => {
      client.transmissions
        .send({
          options: {
            sandbox: false
          },
          content: {
            from: "info@dotnetweekly.com",
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
    });
  }
}

module.exports = Email;
