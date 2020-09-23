require('dotenv').config();
const fs = require('fs');
const folders = fs.readdirSync('./commands/');
const discordScript = require('discordbot-script');
const bot = new discordScript({
  token: process.env.BOT_TOKEN,
  prefix: process.env.BOT_PREFIX
});

for (const files of folders) {
  const folder = fs.readdirSync(`./commands/${files}/`).filter(file => file.endsWith(".js"));

 for (const commands of folder) {
    const command = require(`./commands/${files}/${commands}`);
    bot.Command({
      name: command.name,
      aliases: command.aliases,
      code: command.code
    });
  } 
}

bot.Variables({
  "count": "1"
});

bot.Status({
  0: {
    type: "LISTENING"
    description: "Processed over $getVar[count] emojis! || $ping ms"
  },
  1: {
    type: "WATCHING",
    description: "$allMembersCount users || $serverCount servers"
  },
  2: {
    type: "WATCHING",
    description: "e!invite || e!help"
}, 12000);

bot.MessageEvent();


