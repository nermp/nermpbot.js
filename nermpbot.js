// require the discord.js module
const fs = require("fs");
const Discord = require("discord.js");

// create a new Discord client
const { prefix, token } = require("./config.json");
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once("ready", () => {
	console.log("Ready!");
});

client.on("message", message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	console.log(message.content);
	if (!client.commands.has(commandName)) return;
	const command = client.commands.get(commandName);
	if (command.args && !args.length) {
		return message.channel.send(`you need to put arguments ${message.author}`);
	}
	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply("there was an error trying to execute that command");
	}
});

// login to Discord with your app's token
client.login(token);