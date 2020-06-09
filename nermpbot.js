// require the discord.js module
const fs = require("fs");
const Discord = require("discord.js");

// create a new Discord client
const { prefix, token, snipeinfo, numberOfServers } = require("./config.json");
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let updateNum = -1;

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
	if(updateNum > 100 || updateNum == -1) {
		numberOfServers[0] = client.guilds.cache.size;
		updateNum = 0;
	}
	updateNum++;
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
	if (message.author.bot) {
		return;
	}
	//the array is [author, message, the date, users avatar, and whether or not the message was edited or not. if it was, then the current message is also included.]
	let today = new Date();
	let thisMonth = months[today.getMonth()];
	let hour = today.getHours();
	let minute = today.getMinutes();
	let noon = "AM";
	if (hour > 12) {
		hour = hour - 12;
		noon = "PM";
	}
	if (minute < 10) {
		minute = "0" + minute;
	}
	let date = `${hour}:${minute}:${today.getSeconds()} ${noon} on ${thisMonth} ${today.getDate()},  ${today.getFullYear()}`;
	let snipe = [message.author, message.content, date, message.author.displayAvatarURL({ format: "png", dynamic: true }), false];
	snipeinfo.unshift(snipe);
});

client.on("messageUpdate", function(message, newMessage) {
	if (message.author.bot) {
		return;
	}
	let today = new Date();
	let thisMonth = months[today.getMonth()];
	let hour = today.getHours();
	let minute = today.getMinutes();
	let noon = "AM";
	if (hour > 12) {
		hour = hour - 12;
		noon = "PM";
	}
	if (minute < 10) {
		minute = "0" + minute;
	}
	let date = `${hour}:${minute}:${today.getSeconds()} ${noon} on ${thisMonth} ${today.getDate()},  ${today.getFullYear()}`;
	let snipe = [message.author, message.content, date, message.author.displayAvatarURL({ format: "png", dynamic: true }), true, newMessage.content];
	snipeinfo.unshift(snipe);
});

// login to Discord with your app"s token
client.login(token);