// require the necessary modules
const fs = require("fs");
const Discord = require("discord.js");

// define constants and variables
const { prefix, token, numberOfServers } = require("./config.json");
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
	/* if (command.args && !args.length) {
		return message.channel.send(`you need to put arguments ${message.author}`);
	} */
	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply("there was an error trying to execute that command");
	}
});

client.on("guildCreate", guild => {
	let snipeinfoJSON = { 
		"snipeinfo": [], 
	}; 
	fs.access(`server_snipes/${guild.id}.txt`, error => {
		if (!error) {
			fs.renameSync(`server_snipes/${guild.id}.txt`, `server_snipes/${guild.id}.json`, err => {
			if (err) {
				console.log(err);
				return;
			}
				console.log(`${guild.id}.txt renamed to ${guild.id}.json`);
			});
		} else {
			fs.writeFileSync(`server_snipes/${guild.id}.txt`, JSON.stringify(snipeinfoJSON), { flag: "wx" }, err => {
				if (err) {
					if (err.code === "EEXIST") {
						return;
					}
				console.log(err);
				return;
				}
				console.log("file written");
			}); 
			fs.renameSync(`server_snipes/${guild.id}.txt`, `server_snipes/${guild.id}.json`, err => {
			if (err) {
				console.log(err);
				return;
			}
				console.log(`${guild.id}.txt renamed to ${guild.id}.json`);
			});
		}
	});
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
	let second = today.getSeconds();
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
	let date = `${hour}:${minute}:${second} ${noon} on ${thisMonth} ${today.getDate()},  ${today.getFullYear()}`;
	let snipe = [message.author, message.content, date, message.author.displayAvatarURL({ format: "png", dynamic: true }), false];
	let snipeinfoJSON = { 
		"snipeinfo": [], 
	}; 
	fs.access(`server_snipes/${message.guild.id}.txt`, error => {
		if (!error) {
			message.channel.send("checking");
			fs.renameSync(`server_snipes/${message.guild.id}.txt`, `server_snipes/${message.guild.id}.json`, err => {
			if (err) {
				console.log(err);
				return;
			}
				console.log(`${message.guild.id}.txt renamed to ${message.guild.id}.json`);
			});
		} else {
			fs.writeFileSync(`server_snipes/${message.guild.id}.txt`, JSON.stringify(snipeinfoJSON), { flag: "wx" }, err => {
				//if (err) message.reply("there was an error trying to execute that command");
				if (err) {
					if (err.code === "EEXIST") {
						return;
					}
				console.log(err);
				return;
				}
				console.log("file written");
			}); 
			fs.renameSync(`server_snipes/${message.guild.id}.txt`, `server_snipes/${message.guild.id}.json`, err => {
			if (err) {
				console.log(err);
				return;
			}
				console.log(`${message.guild.id}.txt renamed to ${message.guild.id}.json`);
			});
		}
		const { snipeinfo } = require(`./server_snipes/${message.guild.id}.json`);
		snipeinfo.unshift(snipe);
		//message.channel.send(snipeinfotest);
	});
});

client.on("messageUpdate", function(message, newMessage) {
	if (message.author.bot) {
		return;
	}
	if (message.content == newMessage.content) {
		return;
	}
	let today = new Date();
	let thisMonth = months[today.getMonth()];
	let hour = today.getHours();
	let minute = today.getMinutes();
	let second = today.getSeconds();
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
	let date = `${hour}:${minute}:${second} ${noon} on ${thisMonth} ${today.getDate()},  ${today.getFullYear()}`;
	let snipe = [message.author, message.content, date, message.author.displayAvatarURL({ format: "png", dynamic: true }), true, newMessage.content];
	let snipeinfoJSON = { 
		"snipeinfo": [], 
	}; 
	fs.access(`server_snipes/${message.guild.id}.txt`, error => {
		if (!error) {
			message.channel.send("checking");
			fs.renameSync(`server_snipes/${message.guild.id}.txt`, `server_snipes/${message.guild.id}.json`, err => {
			if (err) {
				console.log(err);
				return;
			}
				console.log(`${message.guild.id}.txt renamed to ${message.guild.id}.json`);
			});
		} else {
			fs.writeFileSync(`server_snipes/${message.guild.id}.txt`, JSON.stringify(snipeinfoJSON), { flag: "wx" }, err => {
				//if (err) message.reply("there was an error trying to execute that command");
				if (err) {
					if (err.code === "EEXIST") {
						return;
					}
				console.log(err);
				return;
				}
				console.log("file written");
			}); 
			fs.renameSync(`server_snipes/${message.guild.id}.txt`, `server_snipes/${message.guild.id}.json`, err => {
			if (err) {
				console.log(err);
				return;
			}
				console.log(`${message.guild.id}.txt renamed to ${message.guild.id}.json`);
			});
		}
		const { snipeinfo } = require(`./server_snipes/${message.guild.id}.json`);
		snipeinfo.unshift(snipe);
		//message.channel.send(snipeinfotest);
	});
});

// login to Discord with your app"s token
client.login(token);