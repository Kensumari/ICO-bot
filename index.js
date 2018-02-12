const commando = require("discord.js-commando");
const TOKEN = require("./token.json");
const bot = new commando.Client({
    commandPrefix: '!',
    owner: '148221621541404673',
    disableEveryone: true
});

bot.registry.registerGroup("random", 'Random');
bot.registry.registerGroup("ico", "ICO");
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.login(TOKEN.id);