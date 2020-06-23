const Discord = require("discord.js");
const { numberOfServers } = require("../config.json");

module.exports = {
	name: "info",
	aliases: ["i"],
	description: "Provides info about the bot. If a user is mentioned, provides info on that user, but only the first one.",
	usage: "<optional mention of a user>",
	execute(message) {
		if (!message.mentions.users.size) {
			const infoEmbed = new Discord.MessageEmbed()
			.setColor("#0000FF")
			.setTitle("Info")
			.setAuthor("nermpbot#8811", "https://i.imgur.com/paVWNPD.png")
			.setDescription("The nermpbot is a bot.")
			.setThumbnail("https://i.imgur.com/paVWNPD.png")
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
				let timeCreatedAt = user.createdAt;
				let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
				let thisMonth = months[timeCreatedAt.getMonth()];
				let hour = timeCreatedAt.getHours();
				let minute = timeCreatedAt.getMinutes();
				let second = timeCreatedAt.getSeconds();
				let noon = "AM";
				if (hour > 12) {
					hour = hour - 12;
					noon = "PM";
				}
				if (minute < 10) {
					minute = "0" + minute;
				}
				if (second < 10) {
					second = "0" + second;
				}
				let date = `${hour}:${minute}:${second} ${noon} on ${thisMonth} ${timeCreatedAt.getDate()},  ${timeCreatedAt.getFullYear()}`;
				return date;
			});
			const id = message.mentions.users.map(user => {
				return user.id;
			});
			const tag = message.mentions.users.map(user => {
				return user.tag;
			});
			const infoEmbed = new Discord.MessageEmbed()
			.setColor("#0000FF")
			.setTitle(`${tag[0]}'s Info`)
			.setAuthor("NermpBot#8811", "https://i.imgur.com/paVWNPD.png")
			.setThumbnail(avatar[0])
			.addFields(
				{ name: "ID:", value: id[0] },
				{ name: "Account Created at:", value: createdAt[0] },
				{ name: "Bot:", value: bot[0] },
			)
			.setTimestamp()
			.setFooter(`Server name: ${message.guild.name}`);
            message.channel.send(infoEmbed);
		}
	},
};