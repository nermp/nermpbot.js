/* eslint-disable no-mixed-spaces-and-tabs */
const { prefix } = require("../config.json");
module.exports = {
	name: "helplegacy",
	description: "List all of my commands or info about a specific command (legacy version).",
	aliases: ["hel", "help2"],
	usage: "<command name>",
	execute(message, args) {
		const data = [];
        const { commands } = message.client;
        if (!args.length) {
            data.push("here's a list of all commands:");
            data.push(commands.map(command => command.name).join(", "));
            data.push(`\nyou can send \`${prefix}help [command name]\` to get info on a specific command`);
            return message.author.send(data, { split: true })
	            .then(() => {
		            if (message.channel.type === "dm") return;
		            message.reply("i've sent you a DM with all commands");
	            })
	            .catch(error => {
		            console.error(`could not send help DM to ${message.author.tag}.\n`, error);s
		            message.reply("i can't DM you (you might have me blocked or DM's from people in this server turned off.)");
	            });
        }
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
	        return message.reply("that's not a valid command");
        }

        data.push(`**Command Name:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(", ")}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        message.channel.send(data, { split: true });
	},
};