module.exports = {
	name: "add",
    description: `Finds the sum of two numbers.`,
    usage: "<number 1> <number 2>",
	execute(message, args) {
        let sum = 0;
        if (!args.length) {
            const filter = m => m.author.id === message.author.id;
            //return message.channel.send(`you need to specify what numbers you're trying to find the sum of ${message.author}`);
            message.channel.send("What two numbers do you want to add? Should be two messages.");
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
                sum = Number(numAdd[0]) + Number(numAdd[1]);
                if (!Number.isNaN(sum)) {
                    message.channel.send(sum);
                } else {
                    message.channel.send("Something went wrong. Most likely, numbers weren't inputted.");
                }
            });

        } else {
            sum = Number(Number(args[0]) + Number(args[1]));
            if (!Number.isNaN(sum)) {
                message.channel.send(sum);
            } else {
                message.channel.send("Something went wrong. Most likely, numbers weren't inputted.");
            }
        }
    },
};