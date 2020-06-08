module.exports = {
	name: "avatar",
	aliases: ["icon", "pfp", "ava", "av"],
	description: "By itself it'll send your profile picture, but you can mention somebody to get theirs.",
	execute(message) {
		if (!message.mentions.users.size) {
			return message.channel.send(`<${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
		}	
		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
		});
		// send the entire array of strings as a message
		// by default, discord.js will `.join()` the array with `\n`
		message.channel.send(avatarList);
	},
};