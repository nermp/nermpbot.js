module.exports = {
	name: "invite",
	description: "Provides an invite link for the bot.",
	usage: "",
	execute(message) {
        message.channel.send("https://discord.com/api/oauth2/authorize?client_id=717820698977894471&permissions=8&scope=bot");
	},
};