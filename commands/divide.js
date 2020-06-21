module.exports = {
	name: "divide",
	description: `Finds the quotient of two numbers.`,
    usage: "<numerator> <denominator>",
    execute(message, args) {
        if (!args.length) {
            return message.channel.send(`you need to specify what numbers you're trying to find the quotient of ${message.author}`);
        } else{
            message.channel.send(args[0] / args[1]);
        }
    },
};