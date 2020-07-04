/* eslint-disable no-mixed-spaces-and-tabs */
const Discord = require("discord.js");
const { prefix } = require("../config.json");
module.exports = {
	name: "help",
	description: "List all of my commands or info about a specific command in an embed (there are multiple pages).",
	aliases: ["commands", "h"],
    usage: "<page number> or <command name>",
    execute(message, args) {
        const { commands } = message.client;
        let data = [];
        let commandInfo = [];
        let names = commands.map(command => command.name);  
        let desc = commands.map(command => command.description);  
        for (let i = 0; i < names.length; i++) {
            data.push([ prefix + names[i], desc[i] ]);
        } 
        let numCommand = Math.floor(data.length / 10);
        let numExtra = data.length % 10;
        let extra = false;
        if (numExtra == 0) { 
            return;
        } else { 
            extra = true;
        }
        const embeds = [];
        for (let i = 0; i < numCommand; i++) {
            const helpEmbed = new Discord.MessageEmbed()
			.setColor("#0000FF")
            .setAuthor("nermpbot#8811", "https://i.imgur.com/paVWNPD.png")
            .setTitle(`Help (${args}/${numCommand})`)
			.setThumbnail("https://i.imgur.com/paVWNPD.png")
			.setTimestamp()
            .setFooter(`Server name: ${message.guild.name}`); 
            for (let x = i * 10; x < (i + 1) * 10 ; x++) {
                helpEmbed.addField(data[x][0], data[x][1], false);
            }
            if (extra) {
                helpEmbed.setTitle(`Help(${i + 1}/${numCommand + 1})`);
            }
            embeds.push(helpEmbed);   
        }
        if (extra) {
            const helpEmbed = new Discord.MessageEmbed()
            .setColor("#0000FF")
            .setAuthor("nermpbot#8811", "https://i.imgur.com/paVWNPD.png")
            .setTitle(`Help (${args}/${numCommand + 1})`)
			.setThumbnail("https://i.imgur.com/paVWNPD.png")
			.setTimestamp()
            .setFooter(`Server name: ${message.guild.name}`); 
            for (let x = numCommand * 10; x < numCommand * 10 + numExtra ; x++) {
                helpEmbed.addField(data[x][0], data[x][1], false);
            }
            embeds.push(helpEmbed);
            numCommand++;
        }
        if (!args.length || args > numCommand || args < 1) {
            message.channel.send(embeds[0]);
        } else if (args > 1 && args <= numCommand) {
            message.channel.send(embeds[args - 1]);
        } else {
            const name = args[0].toLowerCase();
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
            commandInfo.push(`**Command Name:** ${command.name}`);
            if (command.aliases) commandInfo.push(`**Aliases:** ${command.aliases.join(", ")}`);
            if (command.description) commandInfo.push(`**Description:** ${command.description}`);
            if (command.usage) commandInfo.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
            message.channel.send(commandInfo, { split: true });
        }
    },
};