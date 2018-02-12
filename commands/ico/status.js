const commando = require('discord.js-commando');
var adminAcess = "402468020397801478";

class Status extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'status',
			group: 'ico',
			memberName: 'status',
			description: 'Displays bot status (Admins Only)'
		});
	}

	async run(message, args) {
		if(message.member.roles.has(adminAcess)) {
			
			this.client.user.setGame(args);
		}
		else message.reply("You do not have access");
	}

}

module.exports = Status;