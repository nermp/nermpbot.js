const { prefix } = require("../config.json");
module.exports = {
	name: "multiply",
	description: `Finds the product of two numbers when the command is inputted as ${prefix}multiply <number 1> <number 2>.`,
	execute(message, args) {
        if (!args.length) {
            return message.channel.send(`you need to specify what numbers you're trying to find the product of ${message.author}?`);
        } else{
            message.channel.send(args[0] * args[1]);
        }
    },
};