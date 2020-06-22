const Discord = require("discord.js");
const ud = require("urban-dictionary");


module.exports = {
	name: "urbandictionary",
	aliases: ["urban", "urb", "dic", "ud"],
	description: "Gives a random word from urban dictionary, but you can also search for a term.",
	usage: "<optional search term>",
	execute(message, args) {
		if (!args || args == "" || !args.length) {
			ud.random().then((result) => {
				const urbanEmbed = new Discord.MessageEmbed()
				.setColor("#0000FF")
				.setTitle("Urban Dictionary Search")
				.setAuthor("nermpbot#8811", "https://cdn.discordapp.com/avatars/717820698977894471/13e45a6a5baef2be0f40fbbdd05477be.png")
				.setThumbnail("https://cdn.discordapp.com/attachments/717515587504570461/723254952830435398/056200e165284ccd73ec499920dc5d0c.png")
				.setTimestamp()
				.addFields(
					{ name: "Word:", value: result.word },
					{ name: "Definition:", value: result.definition },
					{ name: "Example:", value: result.example },
					{ name: "Link:", value: result.permalink },
				)
				.setFooter(`Server name: ${message.guild.name}`); 
				message.channel.send(urbanEmbed);
			}).catch((error) => {
				console.error(error.message);
			});
		} else {
			ud.term(args.toString()).then((result) => {
				const entries = result.entries;
				const urbanEmbed = new Discord.MessageEmbed()
				.setColor("#0000FF")
				.setTitle("Urban Dictionary Search")
				.setAuthor("nermpbot#8811", "https://cdn.discordapp.com/avatars/717820698977894471/13e45a6a5baef2be0f40fbbdd05477be.png")
				.setThumbnail("https://cdn.discordapp.com/attachments/717515587504570461/723254952830435398/056200e165284ccd73ec499920dc5d0c.png")
				.setTimestamp()
				.addFields(
					{ name: "Word:", value: entries[0].word },
					{ name: "Definition:", value: entries[0].definition },
					{ name: "Example:", value: entries[0].example },
					{ name: "Link:", value: result.permalink },
				)
				.setFooter(`Server name: ${message.guild.name}`); 
				message.channel.send(urbanEmbed);
			}).catch((error) => {
				message.channel.send(`${message.author}, ${error.message}`);
			});
		}
	},
};