const SparkPost = require("sparkpost");
const sparkPostKey = process.env.SPARKPOST;
const client = new SparkPost(sparkPostKey);

class Email {
  send(email, subject, html, campaign_id = "") {
    client.transmissions
    .send({
      options: {
        sandbox: false
      },
      content: {
        from: { "name" : "dotNET Weekly", "email" : "info@dotnetweekly.com" },
        subject: subject,
        html: html
      },
      recipients: [
        { address: email }
      ],
      campaign_id: campaign_id
    })
    .then(data => {
      // console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
  }
}

module.exports = Email;
