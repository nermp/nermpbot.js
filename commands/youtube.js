const youtube = require('scrape-youtube').default;

module.exports = {
    name: "youtube",
    aliases: ["yt"],
	description: `Finds a youtube video using your search query.`,
	execute(message, args) {
        youtube.searchOne(args.toString()).then(results => {
            message.channel.send(results.link);
        });
    },  
};