// require the discord.js module
const fs = require("fs");
const Discord = require("discord.js");

// create a new Discord client
const { prefix, token, snipes, snipeinfo } = require("./config.json");
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
	if (message.content == (prefix) + "info") {
		const infoEmbed = new Discord.MessageEmbed()
			.setColor("#0000FF")
			.setTitle("Info")
			.setAuthor("NermpBot#8811", "https://cdn.discordapp.com/avatars/717820698977894471/13e45a6a5baef2be0f40fbbdd05477be.png")
			.setDescription("The NermpBot is a bot.")
			.setThumbnail("https://cdn.discordapp.com/avatars/717820698977894471/13e45a6a5baef2be0f40fbbdd05477be.png")
			.addFields(
				{ name: "Author:", value: "nermp#5841" },
			)
			.addField("Number of servers I'm in:", client.guilds.cache.size, true)
			.setTimestamp()
			.setFooter(`Server name: ${message.guild.name}`);
            message.channel.send(infoEmbed);
	}

	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	console.log(message.content);
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;
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

client.on("messageDelete", message => {
	let snipe = new Array({ author: message.author, message: message.content, date: new Date() });
	snipeinfo.unshift(snipe);
	snipes.unshift(`"${message.content}" was deleted by ${message.author} at ${new Date()}`);
});

client.on("messageUpdate", message => {
	let snipe = new Array({ author: message.author, message: message.content, date: new Date() });
	snipeinfo.unshift(snipe);
	snipes.unshift(`"${message.content}" was edited by ${message.author} at ${new Date()}`);
});

// login to Discord with your app"s token
client.login(token);