const Discord = require("discord.js");
const { numberOfServers } = require("../config.json");

module.exports = {
	name: "info",
	description: "Provides info about the bot. If a user is mentioned, provides info on that user, but only the first one.",
	execute(message) {
		if (!message.mentions.users.size) {
			const infoEmbed = new Discord.MessageEmbed()
			.setColor("#0000FF")
			.setTitle("Info")
			.setAuthor("nermpbot (testing)#8323", "https://cdn.discordapp.com/avatars/717820698977894471/13e45a6a5baef2be0f40fbbdd05477be.png")
			.setDescription("The nermpbot is a bot.")
			.setThumbnail("https://cdn.discordapp.com/avatars/717820698977894471/13e45a6a5baef2be0f40fbbdd05477be.png")
			.addFields(
				{ name: "Author:", value: "nermp#5841" },
				{ name: "Number of servers I'm in:", value: numberOfServers },
			)
			//.addField("Number of servers I'm in:", numberOfServers, true)
			.setTimestamp()
			.setFooter(`Server name: ${message.guild.name}`);
            message.channel.send(infoEmbed);
		} else {
			const bot = message.mentions.users.map(user => {
				return user.bot;
			});
			const avatar = message.mentions.users.map(user => {
				return user.displayAvatarURL({ format: "png", dynamic: true });
			});
			const createdAt = message.mentions.users.map(user => {
				return user.createdAt;
			});
			const id = message.mentions.users.map(user => {
				return user.id;
			});
			const tag = message.mentions.users.map(user => {
				return user.tag;
			});
			const lastMessageID = message.mentions.users.map(user => {
				return user.lastMessageID;
			});
			const lastMessage = message.mentions.users.map(user => {
				return user.lastMessage;
			});
			const lastChannelID = message.mentions.users.map(user => {
				return user.lastMessageChannelID;
			});
			const infoEmbed = new Discord.MessageEmbed()
			.setColor("#0000FF")
			.setTitle(`${tag[0]}'s Info`)
			.setAuthor("NermpBot#8811", "https://cdn.discordapp.com/avatars/717820698977894471/13e45a6a5baef2be0f40fbbdd05477be.png")
			.setThumbnail(avatar[0])
			.addFields(
				{ name: "ID:", value: id[0] },
				{ name: "Account Created at:", value: createdAt[0] },
				{ name: "Bot:", value: bot[0] },
				{ name: "Last Message Sent:", value: lastMessage[0] },
				{ name: "ID of Last Message Sent:", value: lastMessageID[0] },
				{ name: "ID of Channel Last Message Was Sent In:", value: lastChannelID[0] },
			)
			.setTimestamp()
			.setFooter(`Server name: ${message.guild.name}`);
            message.channel.send(infoEmbed);
		}
	},
};