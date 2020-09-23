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

bot.Status({
  0: 1
});

bot.MessageEvent();


