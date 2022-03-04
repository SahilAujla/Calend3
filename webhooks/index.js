require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const fromPhone = process.env.FROMPHONE;
const toPhone = process.env.TOPHONE;

const app = express();
const PORT = 3100;

app.use(bodyParser.json());
app.listen(PORT, () => console.log(`Running on port ${PORT}`));

// set up twilio client
const client = require("twilio")(accountSid, authToken);

app.post("/webhook", (request, response) => {
  console.log(request.body);

  const activity = request.body.activity;
  const message = `💰🚀 ${activity[0].fromAddress} paid you ${activity[0].value} ETH. https://goerli.etherscan.io/tx/${activity[0].hash} 💰🚀`;

  console.log("message", message);
  console.log("activity", activity);

  client.messages
    .create({
      body: message,
      from: fromPhone,
      to: toPhone,
    })
    .then((message) => console.log(message.sid));

  response.status(200).end();
});
