const Discord = require("discord.js");
const client = new Discord.Client();
const { discordbotsettings, dbSettings } = require("./config.json");
const wokcommands = require("wokcommands");
client.login(discordbotsettings.token);
client.once("ready", function () {
  new wokcommands(client, {
    commandsDir: "commands",
    showWarns: false,
  })
    .setDefaultPrefix(discordbotsettings.prefix)
    .setMongoPath(
      dbSettings.mongoURI.replace("<password>", dbSettings.password)
    );
  console.log("I Am %cWorking", "color:green");
});
