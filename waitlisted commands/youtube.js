const urllib = require("urllib");
const { prefix } = require("../config.json");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = {
    name: "youtube",
    aliases: "yt",
	description: `Finds three youtube videos using your search query when the command is inputted as ${prefix}youtube <search query>.`,
	execute(message, args) {
        if (!args.length) {
            return message.channel.send(`you need to specify what you're trying to search for ${message.author}`);
        } else{
            message.channel.send("Here are three results for your search query.")
            var test = new XMLHttpRequest();
            var bruh = test.open('POST', "http://www.youtube.com/results?search_query=" + args, false);
            var rx = new RegExp("href=\"\\/watch\\?v=(.{11})", "g");
            var search_results = new Array();
            while((match = rx.exec(bruh)) !== null){
                search_results.push(match);
            } 
            //var search_results = bruh.match("href=\"\\/watch\\?v=(.{11})");
            //const response = test.responseText;
            //message.channel.send(response);
            message.channel.send("http://www.youtube.com/results?search_query=" + args);
            message.channel.send("http://www.youtube.com/watch?v=" + search_results[0])
            message.channel.send("http://www.youtube.com/watch?v=" + search_results[2])
            message.channel.send("http://www.youtube.com/watch?v=" + search_results[4])
            /* //const query_string = urllib.parse({"search_query": agrs});
            const test = urllib.request("http://www.youtube.com/results?" + args,{
                method: "GET",
                data: {
                    "search_query": args
                },
            }).catch(function (err) {
                console.error(err);
            }).then(function(result){
                result: {data: buffer, res: response object}
            });
            //const bruh = test.data;
            message.channel.send(test); */
            //const search_results = re.findall("href=\"\\/watch\\?v=(.{11})", htm_content.read().decode());
            //message.channel.send("http://www.youtube.com/watch?v=" + search_results[0])
            //message.channel.send("http://www.youtube.com/watch?v=" + search_results[2])
            //message.channel.send("http://www.youtube.com/watch?v=" + search_results[4])
        }
        
	},
};