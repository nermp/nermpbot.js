const { prefix, snipes, snipeinfo } = require("../config.json");

module.exports = {
    name: "snipe",
    aliases: ["sn", "deleted", "del", "edit", "ed"],
	description: `Tells you the last deleted or edited message. You can also see previously edited/deleted messages by inputting the command as ${prefix}snipe <number>.`,
	execute(message, args) {
        if (args == null || args < 1) {
            message.channel.send(snipes[0] + ` (This is snipe 1 out of ${snipes.length}).`);
        } else if (args <= snipes.length) {
            message.channel.send(snipes[args - 1] + ` (This is snipe ${args} out of ${snipes.length}).`);
        } else if (snipes.length === 1 && args > snipes.length) {
                message.channel.send(`You are requesting a snipe that doesn't exist. There is currently 1 snipe available. `);
        } else {
                message.channel.send(`You are requesting a snipe that doesn't exist. There are currently ${snipes.length} snipes available. `);
        }
	},
};