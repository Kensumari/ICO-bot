const commando = require('discord.js-commando');
const mysql = require('mysql');
var channel = require('./channel.json');

const con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "apple",
	database: "icoprediction"
});

class Countdown extends commando.Command {
	constructor(client){
		super(client, {
			name: 'countdown',
			group: 'ico',
			memberName: 'countdown',
			description: 'Countdown all ongoing ICO',
		});
	} 

	async run(message, args) {
		var select = `SELECT name, website, DATEDIFF(datetime, NOW()) AS timeRemaining FROM icoprediction ORDER BY datetime ASC`;
		con.query(select, (err, results) => {
			if(err) {
				message.reply("Input Error");
			}

			var output = [];

			results.forEach(result => {
				if(result.timeRemaining >= 0) {
					output.push(`${result.name} <${result.website}> ${result.timeRemaining} days left \n\n`); //+= `${result.name} <${result.website}> ${result.timeRemaining} days left \n\n`;
				}
			});
			message.direct(output.join(""));

		});
	}
}

module.exports = Countdown;