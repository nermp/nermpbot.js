module.exports = {
	name: "add",
    description: `Finds the sum of two numbers.`,
    usage: "<number 1> <number 2>",
	execute(message, args) {
        if (!args.length) {
            return message.channel.send(`you need to specify what numbers you're trying to find the sum of ${message.author}`);
        } else{
            message.channel.send(Number(args[0]) + Number(args[1]));
        }
    },
};