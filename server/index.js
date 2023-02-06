const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

//twilio requirements -- Texting API
const accountSid = "ACdc045834eb7058a422a72bf341788831";
const authToken = "7df1e4610ed5565f7a59e63c28cfd4ae";
const client = new twilio(accountSid, authToken);

const app = express(); //alias

app.use(cors()); //Blocks browser from restricting any data

//Welcome Page for the Server
app.get("/", (req, res) => {
  res.send("Welcome to the Express Server");
});

//Twilio
app.get("/send-text", (req, res) => {
  //Welcome Message
  res.send("Hello to the Twilio Server");
  let msg =
    "Dustbin Overfilled..!!\nDustbin Status above 90 percent.\nDustbin Location: https://goo.gl/maps/fJLyTpcGegjsRqrr7";
  //Send Text
  client.messages
    .create({
      body: msg,
      to: "+918210295520", // Text this number
      from: "+16232679879", // From a valid Twilio number
    })
    .then((message) => console.log(message.body));
});

app.listen(4000, () => console.log("Running on Port 4000"));
