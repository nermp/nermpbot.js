/* eslint-disable no-mixed-spaces-and-tabs */
const Discord = require("discord.js");
const { prefix } = require("../config.json");
module.exports = {
	name: "helpembed",
	description: "List all of my commands or info about a specific command in an giant embed(normal help command is recommended).",
	aliases: ["help2", "helpe", "h2", "he"],
	execute(message) {
        const { commands } = message.client;
        let data = [];
        let names = commands.map(command => command.name);  
        let desc = commands.map(command => command.description);  
        for (let i = 0; i < names.length; i++) {
            data.push([ prefix + names[i], desc[i] ]);
        } 
        const helpEmbed = new Discord.MessageEmbed()
			.setColor("#0000FF")
			.setTitle("Help")
			.setAuthor("nermpbot#8811", "https://cdn.discordapp.com/avatars/717820698977894471/13e45a6a5baef2be0f40fbbdd05477be.png")
			.setThumbnail("https://cdn.discordapp.com/avatars/717820698977894471/13e45a6a5baef2be0f40fbbdd05477be.png")
			.setTimestamp()
            .setFooter(`Server name: ${message.guild.name}`); 
        for (let x = 0; x < data.length; x++) {
            helpEmbed.addField(data[x][0], data[x][1], false);
        }
        message.channel.send(helpEmbed);
    },
};