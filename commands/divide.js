const { prefix } = require("../config.json");
module.exports = {
	name: "divide",
	description: `Finds the quotient of two numbers when the command is inputted as ${prefix}divide <number 1> <number 2>.`,
	execute(message, args) {
        if (!args.length) {
            return message.channel.send(`you need to specify what numbers you're trying to find the quotient of ${message.author}`);
        } else{
            message.channel.send(args[0] / args[1]);
        }
    },
};