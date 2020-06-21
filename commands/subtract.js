module.exports = {
	name: "subtract",
	description: `Finds the difference between two numbers.`,
    usage: "<number 1> <number 2>",
    execute(message, args) {
        if (!args.length) {
            return message.channel.send(`you need to specify what numbers you're trying to find the difference of ${message.author}`);
        } else{
            message.channel.send(args[0] - args[1]);
        }
    },
};