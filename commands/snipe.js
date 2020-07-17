/* eslint-disable brace-style */
const Discord = require("discord.js");
const fs = require("fs");
//const nb = require("../nermpbot.js");

module.exports = {
    name: "snipe",
    aliases: ["sn", "deleted", "del", "edit", "ed"],
	description: `Tells you the last deleted or edited message. You can also see previously edited/deleted messages.`,
    usage: "<optional number of snipe to see>",
    execute(message, args) {
        fs.access(`server_snipes/${message.guild.id}.json`, error => {
            if (!error) {
                console.log("accessed");
                const { snipeinfo } = require(`../server_snipes/${message.guild.id}.json`);
                snipe(snipeinfo, message, args);
            } else {
                const snipeinfo = [];
                snipe(snipeinfo, message, args);
            }
        });
	},
};

let snipe = function(snipeinfo, message, args) {
    const snipeEmbed = new Discord.MessageEmbed()
                .setColor("#0000FF")
                .setAuthor("nermpbot#8811", "https://i.imgur.com/paVWNPD.png")
                .setTimestamp()
                .setFooter(`Server name: ${message.guild.name}`);
            if (args == "clear") {
                if (message.member.hasPermission("ADMINISTRATOR")) {
                    fs.unlink(`./server_snipes/${message.guild.id}.json`, err => {
                        if (!err) {
                            console.log("snipes cleared");
                            message.channel.send("Snipes cleared.");
                        } else if (err.code == "ENOENT") {
                            message.channel.send("There are no snipes to clear.");
                            console.log(err);
                        } else {
                            message.channel.send("There was an issue clearing the snipes.");
                            console.log(err);
                        }
                    });
                } else {
                    message.channel.send("Only admins can clear snipes.");
                }
            } else if(snipeinfo.length == 0) {
                message.channel.send(`There are no snipes available at this time.`);
            } else if (args === "" || args <= 0) {
                snipeEmbed.setTitle(`Snipe (1/${snipeinfo.length}) `);
                snipeEmbed.setThumbnail(snipeinfo[0][3]);
                if (snipeinfo[0][5] == true) {
                    snipeEmbed.addFields(
                        { name: "Author:", value: snipeinfo[0][0] },
                        { name: "Message edited:", value: snipeinfo[0][1] },
                        { name: "Message edited to:", value: snipeinfo[0][6] },
                        { name: "Time edited:", value: snipeinfo[0][2] },
                        { name: "Channel edited in:", value: snipeinfo[0][4] },
                        { name: "Message link:", value: snipeinfo[0][7] },
                    );
                } else {
                    snipeEmbed.addFields(
                        { name: "Author:", value: snipeinfo[0][0] },
                        { name: "Message deleted:", value: snipeinfo[0][1] },
                        { name: "Message deleter:", value: snipeinfo[0][6] },
                        { name: "Time deleted:", value: snipeinfo[0][2] },
                        { name: "Channel deleted in:", value: snipeinfo[0][4] },
                    );
                }
                message.channel.send(snipeEmbed);
            } else if (args <= snipeinfo.length) {
                snipeEmbed.setTitle(`Snipe (${args}/${snipeinfo.length}) `);
                snipeEmbed.setThumbnail(snipeinfo[args - 1][3]);
                if (snipeinfo[args - 1][5] == true) {
                    snipeEmbed.addFields(
                        { name: "Author:", value: snipeinfo[args - 1][0] },
                        { name: "Message edited:", value: snipeinfo[args - 1][1] },
                        { name: "Message edited to:", value: snipeinfo[args - 1][6] },
                        { name: "Time edited:", value: snipeinfo[args - 1][2] },
                        { name: "Channel edited in:", value: snipeinfo[args - 1][4] },
                        { name: "Message link:", value: snipeinfo[args - 1][7] },
                    );
                } else {
                    snipeEmbed.addFields(
                        { name: "Author:", value: snipeinfo[args - 1][0] },
                        { name: "Message deleted:", value: snipeinfo[args - 1][1] },
                        { name: "Message deleter:", value: snipeinfo[args - 1][6] },
                        { name: "Time deleted:", value: snipeinfo[args - 1][2] },
                        { name: "Channel deleted in:", value: snipeinfo[args - 1][4] },
                    );
                }
                message.channel.send(snipeEmbed);
            } else if (snipeinfo.length === 1 && args > snipeinfo.length || args === 0) {
                    message.channel.send(`You are requesting a snipe that doesn't exist. There is currently 1 snipe available. `);
            } else {
                    message.channel.send(`You are requesting a snipe that doesn't exist. There are currently ${snipeinfo.length} snipes available. `);
            }

};