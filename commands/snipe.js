/* eslint-disable brace-style */
const Discord = require("discord.js");
const { prefix } = require("../config.json");

module.exports = {
    name: "snipe",
    aliases: ["sn", "deleted", "del", "edit", "ed"],
	description: `Tells you the last deleted or edited message. You can also see previously edited/deleted messages by inputting the command as \`${prefix}snipe <number>\`.`,
	execute(message, args) {
        const { snipeinfo } = require(`../server_snipes/${message.guild.id}.json`);
        //message.channel.send(snipeinfo);
        const snipeEmbed = new Discord.MessageEmbed()
            .setColor("#0000FF")
            .setAuthor("nermpbot#8811", "https://cdn.discordapp.com/avatars/717820698977894471/13e45a6a5baef2be0f40fbbdd05477be.png")
            .setTimestamp()
            .setFooter(`Server name: ${message.guild.name}`);
        if(snipeinfo.length == 0) {
            message.channel.send(`There are no snipes available at this time.`);
        } else if (args === "" || args <= 0) {
            snipeEmbed.setTitle(`Snipe (1/${snipeinfo.length}) `);
            snipeEmbed.setThumbnail(snipeinfo[0][3]);
            if (snipeinfo[0][4] == true) {
                snipeEmbed.addFields(
                    { name: "Author:", value: snipeinfo[0][0] },
                    { name: "Message edited:", value: snipeinfo[0][1] },
                    { name: "Time edited:", value: snipeinfo[0][2] },
                    { name: "Message edited to:", value: snipeinfo[0][5] },
                );
            } else {
                snipeEmbed.addFields(
                    { name: "Author:", value: snipeinfo[0][0] },
                    { name: "Message deleted:", value: snipeinfo[0][1] },
                    { name: "Time deleted:", value: snipeinfo[0][2] },
                );
            }
            message.channel.send(snipeEmbed);
        } else if (args <= snipeinfo.length) {
            snipeEmbed.setTitle(`Snipe (${args}/${snipeinfo.length}) `);
            snipeEmbed.setThumbnail(snipeinfo[args - 1][3]);
            if (snipeinfo[args - 1][4] == true) {
                snipeEmbed.addFields(
                    { name: "Author:", value: snipeinfo[args - 1][0] },
                    { name: "Message edited:", value: snipeinfo[args - 1][1] },
                    { name: "Time edited:", value: snipeinfo[args - 1][2] },
                    { name: "Message edited to:", value: snipeinfo[args - 1][5] },
                );
            } else {
                snipeEmbed.addFields(
                    { name: "Author:", value: snipeinfo[args - 1][0] },
                    { name: "Message deleted:", value: snipeinfo[args - 1][1] },
                    { name: "Time deleted:", value: snipeinfo[args - 1][2] },
                );
            }
            message.channel.send(snipeEmbed);
        } else if (snipeinfo.length === 1 && args > snipeinfo.length || args === 0) {
                message.channel.send(`You are requesting a snipe that doesn't exist. There is currently 1 snipe available. `);
        } else {
                message.channel.send(`You are requesting a snipe that doesn't exist. There are currently ${snipeinfo.length} snipes available. `);
        }
	},
};