module.exports = {
	name: "reverse",
    description: `Reverses the text inputted.`,
    aliases: ["r", "esrever", "backwards", "back"],
    usage: "<text to reverse>",
	execute(message, args) {
        if (!args.length) {
            return message.reply(`you need to specify what you're trying to reverse.`);
        } else{
            let reversed = args.toString().split("").reverse();
            for (let x = 0; x < reversed.length; x++) {
                if (reversed[x] == ",") {
                    reversed[x] = " ";
                }
            }
            message.channel.send(reversed.join(""));
        }
    },
};