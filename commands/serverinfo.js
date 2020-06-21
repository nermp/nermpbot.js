const Discord = require("discord.js");

module.exports = {
	name: "serverinfo",
    aliases: ["si"],
    description: "Provides info about the bot. If a user is mentioned, provides info on that user, but only the first one.",
    usage: "",
    execute(message) {
        const guild = message.guild;
        let timeCreatedAt = guild.createdAt;
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
        const serverinfoEmbed = new Discord.MessageEmbed()
			.setColor("#0000FF")
			.setTitle(`Info for ${guild.name}`)
			.setAuthor("nermpbot#8811", "https://cdn.discordapp.com/avatars/717820698977894471/13e45a6a5baef2be0f40fbbdd05477be.png")
			.setThumbnail(guild.iconURL())
			.addFields(
                { name: "Availablity (for testing):", value: guild.available },
                { name: "Owner:", value: guild.owner },
                { name: "Time created:", value: date },
                { name: "Number of channels:", value: guild.channels.cache.size },
                { name: "Number of members:", value: guild.memberCount },
                { name: "Number of roles:", value: guild.roles.cache.size },
                { name: "Region:", value: guild.region },
                { name: "Number of guild emojis:", value: guild.emojis.cache.size },
                { name: "Default notification settings:", value: guild.defaultMessageNotifications.toLowerCase() },
                { name: "Explicit content filter:", value: guild.explicitContentFilter.toLowerCase() },
			)
			.setTimestamp()
			.setFooter(`Server name: ${message.guild.name}`);
            message.channel.send(serverinfoEmbed);
	},
};