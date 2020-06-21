const youtube = require('scrape-youtube').default;

module.exports = {
    name: "youtube",
    aliases: ["yt"],
    description: `Finds a youtube video using your search query.`,
    usage: "<search term>",
	execute(message, args) {
        let searchNum = parseInt(args[1]);
        if (!searchNum.toString().length || searchNum <= 0) { 
            searchNum = 1;
        }
        if (searchNum > 5) {
            searchNum = 5;
        }
        youtube.search(args[0].toString(), { limit: searchNum }).then(results => {
            console.log(results);
            for (let i = 0; i < searchNum; i++) {
                message.channel.send(results[i].link);
            }
        });
    },  
};