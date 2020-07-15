module.exports = {
	name: "divide",
	description: `Finds the quotient of two numbers.`,
    usage: "<dividend> <divisor>",
    execute(message, args) {
        let quo = 0;
        if (!args.length) {
            const filter = m => m.author.id === message.author.id;
            //return message.channel.send(`you need to specify what numbers you're trying to find the quotient of ${message.author}`);
            message.channel.send("What two numbers do you want to divide? Should be two messages, with the dividend first and the divisor second.");
            const numMessageCollector = message.channel.createMessageCollector(filter, { time: 10000, max: 2 });
            numMessageCollector.on("collect", m => {
                console.log(`Collected ${m.content}`);
            });
        
            numMessageCollector.on("end", collected => {
                console.log(`Collected ${collected.size} items`);
                if (collected.size == 0) {
                    return message.reply("nothing was inputted.");
                }
                let numAdd = collected.map(numMessage => {
                    return numMessage.content;
                });
                quo = Number(numAdd[0]) / Number(numAdd[1]);
                if (!Number.isNaN(quo)) {
                    message.channel.send(quo);
                } else {
                    message.channel.send("Something went wrong. Most likely, numbers weren't inputted.");
                }
            });

        } else {
            quo = Number(Number(args[0]) / Number(args[1]));
            if (!Number.isNaN(quo)) {
                message.channel.send(quo);
            } else {
                message.channel.send("Something went wrong. Most likely, numbers weren't inputted.");
            }
            message.channel.send(quo);
        }
    },
};