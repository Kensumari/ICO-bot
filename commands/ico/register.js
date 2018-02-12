const commando = require('discord.js-commando');
const mysql = require('mysql');
const { RichEmbed } = require('discord.js');
var adminAccess = "402468020397801478";
var modAccess = "408519794577637387";

// This function is adding into database, removing all previous messages and displaying the new registered list in the #attractive-ico channel

var channel = require('./channel.json');

const con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "apple",
	database: "icoprediction"
});

class Register extends commando.Command {
	constructor(client){
		super(client, {
			name: 'register',
			group: 'ico',
			memberName: 'register',
			description: 'Register an ico (Admins Only)',
			examples: ['ICO Webpage Presale/Mainsale Whitelist bonus pool Time(in CET) e.g. \n Gems https://gems.org/ Presale 1 30 0 18:00']
		});
	}

	async run(message, args) {
		if(message.member.roles.has(adminAccess || modAccess)) {	
			var ico = args.split(' ');
			if(ico.length == 7) {
				var command = `INSERT INTO ICOPrediction (name, website, sale, bonus, pool, datetime) VALUES (?, ?, ?, ?, ?, ?);`;
				var select = `SELECT name, website, sale, bonus, pool, datetime, DATEDIFF(datetime, NOW()) AS timeRemaining FROM icoprediction ORDER BY datetime ASC`;
				con.query(command, [ico[0], ico[1], ico[2], ico[3], ico[4], ico[5] + " " + ico[6]], function(err) {
					if(!err) {
						message.reply("Registered ICO");
	                } 
					else message.reply("Already exists");
				});
				this.client.channels.get(channel.attractive).bulkDelete(20);
				con.query(select, (err, results) => {
	                if(err) {
	                    message.reply("Database Error");
	                }
					var currentDate = new Date();
					var conversion;
					var output = [];

					results.forEach(result => {
						if(result.timeRemaining >= 0) {
							if(result.pool == 1) {
								conversion = 'Yes';
							}
							else {conversion = 'No';}
							output.push(`${result.name} - <${result.website}> - ${result.sale} - Bonus : ${result.bonus}% - Pool : ${conversion} - ${result.datetime} \n\n`);
						}
					});
					const embed = new RichEmbed()
						.setDescription(output.join(""))
						.setColor(0x00AE86)
						.setTitle("Highly regarded ongoing ICOs right now")
						.setAuthor("ICO-Predictioner","http://static4.comicvine.com/uploads/scale_small/0/77/4359914-7-einstein-digital-art-digital-art-by-mark-fredrickson.jpg")
						.setThumbnail("http://static4.comicvine.com/uploads/scale_small/0/77/4359914-7-einstein-digital-art-digital-art-by-mark-fredrickson.jpg")
						.setFooter(`Last updated ${currentDate}`)

					this.client.channels.get(channel.attractive).send(embed);
			    });
		    }
	        else message.reply("Input Error : You added or wrote wrong datatype");
	    }
	    else message.reply("You are not an admin.")
    }	
}

module.exports = Register;