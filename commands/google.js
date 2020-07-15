const google = require("google-it");

module.exports = {
    name: "google",
    aliases: ["goo", "goog", "gle", "g"],
    description: `Finds a link using your search query in google.`,
    usage: "<search term>",
	execute(message, args) {
        if (args.length) {
            let searchNum = parseInt(args[1]);
            if (!searchNum.toString().length || searchNum <= 0) { 
                searchNum = 1;
            }
            if (searchNum > 5) {
                searchNum = 5;
            }
            google({ "query": args[0].toString() }).then(results => {
                for (let i = 0; i < searchNum; i++) {
                    message.channel.send(results[i].link);
                }
            }).catch(e => {
                console.log(e);
                message.channel.send(`${message.author}, there was an error trying to execute that command`);
            });
        } else {
            message.channel.send("You need to input a search term.");
        }
    },  
};