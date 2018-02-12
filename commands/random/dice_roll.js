const commando = require('discord.js-commando');

class DiceRollCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'roll',
			group: 'random',
			memberName: 'roll',
			description: 'Rolls a die from 1-100'
		});
	}

	async run(message, args) {
		var roll = Math.floor(Math.random () * 100) + 1;
		message.reply("You rolled a " + roll);
	}

}

module.exports = DiceRollCommand;