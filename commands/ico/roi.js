const commando = require('discord.js-commando');

class AllSale extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'roi',
			group: 'ico',
			memberName: 'roi',
			description: 'Displays the return of investment of a specific coin since ICO'
		});
	}


	async run(message, args) {
		if(message.member.roles.has(adminAcess)) {

			message.reply("You have access");

		}
		else message.reply("You do not have access");
	}

}

module.exports = AllSale;