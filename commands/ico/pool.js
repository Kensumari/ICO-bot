const commando = require('discord.js-commando');
var channel = require('./channel.json');
var adminAcess = "402468020397801478";
var poolhref = "https://www.primablock.com/pool/0xb5aa3df1fc1acb3a50d9e0e1997a9049aa412297/contributor";

class AllSale extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'pool',
			group: 'ico',
			memberName: 'pool',
			description: 'ICO Pooling'
		});
	}


	async run(message, args) {
		if(message.member.roles.has(adminAcess)) {

			const embed = new RichEmbed()
				.setDescription(output.join(""))
				.setColor(0x00AE86)
				.setTitle(`Pooling ICOs is made from a smart contract. The website to pool is ${poolhref}`)
				.setAuthor("ICO-Predictioner","http://static4.comicvine.com/uploads/scale_small/0/77/4359914-7-einstein-digital-art-digital-art-by-mark-fredrickson.jpg")
				.setThumbnail("http://static4.comicvine.com/uploads/scale_small/0/77/4359914-7-einstein-digital-art-digital-art-by-mark-fredrickson.jpg")
				.setFooter(`Last updated ${currentDate}`)

			this.client.channels.get(channel.pool).send(embed);


		}
		else message.reply("You do not have access");
	}

}

module.exports = AllSale;