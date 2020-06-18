const google = require("google-it");

module.exports = {
    name: "google",
    aliases: ["goo", "goog", "gle", "g"],
	description: `Finds a link using your search query in google.`,
	execute(message, args) {
        const options = {
            "only-urls": true,
        };
        google({ options, "query": args.toString() }).then(results => {
            message.channel.send(results[0].link);
          }).catch(e => {
              console.log(e);
              message.channel.send(`${message.author}, there was an error trying to execute that command`);
          });
    },  
};