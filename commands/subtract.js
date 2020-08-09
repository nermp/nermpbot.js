module.exports = {
	name: "subtract",
	description: `Finds the difference between two numbers.`,
    usage: "<number 1> <number 2>",
    execute(message, args) {
        let diff = 0;
        if (!args.length) {
            const filter = m => m.author.id === message.author.id;
            //return message.channel.send(`you need to specify what numbers you're trying to find the difference of ${message.author}`);
            message.channel.send("What two numbers do you want to subtract? Should be two messages, with the number to subtract from first and the number to subtract second.");
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
                diff = Number(numAdd[0]) - Number(numAdd[1]);
                if (!Number.isNaN(diff)) {
                    message.channel.send(diff);
                } else {
                    message.channel.send("Something went wrong. Most likely, numbers weren't inputted.");
                }
            });

        } else {
            diff = Number(Number(args[0]) - Number(args[1]));
            if (!Number.isNaN(diff)) {
                message.channel.send(diff);
            } else {
                message.channel.send("Something went wrong. Most likely, numbers weren't inputted.");
            }
        }
    },
};