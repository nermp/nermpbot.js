module.exports = {
	name: "simpoll",
    description: `Create simple polls which will have thumbs up, thumbs down, and undecided options.`,
    aliases: ["sp", "simp"],
    usage: "<poll question>",
	execute(message, args) {
        if (!args.length) {
            return message.reply(`you need to give a poll question.`);
        }
        message.channel.send(`${args.join(" ")} - ${message.author}`).then(sent => {
            message.channel.messages.fetch(sent.id).then(sentMessage => {
                sentMessage.react("👍");
                sentMessage.react("👎");
                sentMessage.react("🤷‍♂️");
            });
        });
        message.delete();
    },
};