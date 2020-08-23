module.exports = {
	createSnipeCache: function(guild) {
		createSnipeCache(guild);
	},
};

// require the necessary modules
const fs = require("fs");
const Discord = require("discord.js");


// define constants and variables
const { prefix, numberOfServers } = require("./config.json");
//token below for github (uncomment when pushing this file)
const token = process.env.TOKEN;
//token below for testing (replace with "nermpbeta token" when pushing to avoid releasing that token)
//const token = "nermpbeta token";
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let updateNum = -1;
const joinID = "722528215977164840";
const leaveID = "722528230313295933";
let snipeCache;

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once("ready", () => {
	client.user.setPresence({ activity: { name: "nermpbot.js", type: "PLAYING" }, status: "online" });
	console.log(client.user.username);
	console.log("Ready!");
	let guilds = client.guilds.map(guild => {
		return guild.id;
	});
	for (let i = 0; i < client.guilds.cache.size; i++) {
		createSnipeCache(guilds[i]);
	}
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


function createSnipeCache(guild, message, edited, newMessage) {
	console.log("creating snipe cache");
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
		if (message != null) {
			snipeCache = require(`./server_snipes/${guild.id}.json`);
			snipeCache.snipeinfo.unshift(createSnipe(message, edited, newMessage));
		} 
		console.log("snipe cache created");
	});
}

function createSnipe(message, edited, newMessage) {
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
	let content = message.content;
	const imageURL = message.attachments.map(url => {
		return url.proxyURL;
	});
	if (typeof imageURL[0] !== "undefined") {
		if (!message.content) {
			content = imageURL[0].toString();
		} else {
			content = `${message.content} ${imageURL[0].toString()}`;
		}
	}
	if (edited == true) {
		let newContent = newMessage.content;
		const newImageURL = newMessage.attachments.map(url => {
			return url.proxyURL;
		});
		if (typeof newImageURL[0] !== "undefined") {
			if (!newMessage.content) {
				newContent = newImageURL[0].toString();
			} else {
				newContent = `${newMessage.content} ${newImageURL[0].toString()}`;
			}	
		}
		let snipe = [message.author, content, date, message.author.displayAvatarURL({ format: "png", dynamic: true }), message.channel, true, newContent, message.url];
		return snipe;
	} else {
		let snipe = [message.author, content, date, message.author.displayAvatarURL({ format: "png", dynamic: true }), message.channel, false, newMessage];
		return snipe;
	}
}

client.on("guildCreate", guild => {
	createSnipeCache(guild);
	const joinEmbed = new Discord.MessageEmbed()
			.setColor("#0000FF")
			.setTitle("Joined Server")
			.setDescription(`Server name: ${guild.name}`)
			.setAuthor("nermpbot#8811", "https://cdn.discordapp.com/avatars/717820698977894471/13e45a6a5baef2be0f40fbbdd05477be.png")
			.setThumbnail(guild.iconURL())
			.setTimestamp()
			.setFooter(`Server name: nermpbot server`); 
	const channel = client.channels.cache.get(joinID);
	channel.send(joinEmbed);
});

client.on("guildDelete", guild => {
	const leaveEmbed = new Discord.MessageEmbed()
			.setColor("#0000FF")
			.setTitle("Left Server")
			.setDescription(`Server name: ${guild.name}`)
			.setAuthor("nermpbot#8811", "https://cdn.discordapp.com/avatars/717820698977894471/13e45a6a5baef2be0f40fbbdd05477be.png")
			.setThumbnail(guild.iconURL())
			.setTimestamp()
            .setFooter(`Server name: nermpbot server`); 
	const channel = client.channels.cache.get(leaveID);
	channel.send(leaveEmbed);
});

client.on("messageDelete", async message => {
	if (message.author.bot) return;
	if (!message.guild) return;
	let deleter = "";
	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: 'MESSAGE_DELETE',
	});
	const deletionLog = fetchedLogs.entries.first();
	if (!deletionLog) {
		deleter = `Most likely ${message.author}`;
		console.log(`${message.author} most likely just deleted their own message.`);
	} else {
		const { executor, target } = deletionLog;
			if (target.id === message.author.id) {
				deleter = executor;
				console.log(`A message by ${message.author.tag} was deleted by ${executor.tag}.`);
			} else {
				deleter = `Most likely ${message.author}`;
				console.log(`${message.author} most likely just deleted their own message.`);
			}
	}
	//the array is [author, message, the date, users avatar, and whether or not the message was edited or not. if it was, then the current message is also included.]
	createSnipeCache(message.guild, message, false, deleter);
});

client.on("messageUpdate", function(message, newMessage) {
	if (message.author.bot) return;
	if (message.content == newMessage.content) return;
	if (!message.guild) return;
	createSnipeCache(message.guild, message, true, newMessage);
});

// login to Discord with your app"s token
client.login(token);
