const { snipes, snipeinfo } = require("../config.json");

module.exports = {
    name: "snipe",
    aliases: ["sn", "deleted", "del"],
	description: "Tells you the last deleted or edited message.",
	execute(message, args) {
        if (args == null || args < 1) {
            message.channel.send(snipes[0] + ` (This is snipe 1 out of ${snipes.length}).`);
        } else {
            message.channel.send(snipes[args - 1] + ` (This is snipe ${args} out of ${snipes.length}).`);
        }
	},
};