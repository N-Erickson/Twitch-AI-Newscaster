require('dotenv').config()
const Twitch  = require("twitch-js");
const axios = require("axios");
const fs = require("fs");

// Command
const COMMAND_NAME = "!talk"; // Command to type in chat.

// Check .env
if(process.env.TWITCH_CHANNEL === "") {
  console.error(`You must enter a Twitch channel.`);
  process.exit();
}

// Command cooldown
const COMMAND_COOLDOWN = Number(process.env.COMMAND_COOLDOWN);
let commandLastUsed = 0;

const client = new Twitch.client({
  channels: [`#${process.env.TWITCH_CHANNEL}`]
});

// Twitch chat listener
client.on('chat', (channel, userstate, message, self) => {

  // Is user that's posting a mod or broadcaster?
  if(Math.round((new Date()).getTime() / 1000) > commandLastUsed + COMMAND_COOLDOWN) {
    if(userstate.badges != null && userstate.badges.hasOwnProperty("broadcaster") && userstate.badges.broadcaster === '1' || userstate.mod === false) {
      message = message.toLowerCase();
      if(message.indexOf(COMMAND_NAME) === 0) { // sent !talk command
        message = message.split(" ");
        if(message.length > 1) { // sent prompt
          message.shift();
          message = message.join(" ");

          // Write the message to a text file
          fs.writeFileSync("prompt.txt", message);

          // Call the Python script to perform text-to-speech
          const spawn = require("child_process").spawn;
          spawn("python", ["text_to_speech.py"]);

        }
      }
    }
  }

});

// Connect to twitch chat
client.connect();
