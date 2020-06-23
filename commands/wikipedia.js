/* eslint-disable no-mixed-spaces-and-tabs */
const Discord = require("discord.js");
const wp = require("wtf_wikipedia");

module.exports = {
	name: "wikipedia",
	description: "Finds a wikipedia page",
	aliases: ["wiki", "pedia", "wp"],
    usage: "<search term>",
    execute(message, args) {
        if (!args.length) {
            message.channel.send("you need to put a search term");
        } else { 
            wp.fetch(args.toString()).then((result) => {
                console.log(result);
                let title = result.title();
                let summary = result.sentences(0).text();
                let link = result.title().toLowerCase().split(" ");
                link = link.join("_");
                console.log(link);
                const helpEmbed = new Discord.MessageEmbed()
                    .setColor("#0000FF")
                    .setTitle("Wikipedia Search")
                    .setAuthor("nermpbot#8811", "https://i.imgur.com/paVWNPD.png")
                    .setThumbnail("https://i.imgur.com/MD0cPC4.png")
                    .addFields(
                        { name: "Title:", value: title },
                        { name: "Summary:", value: summary },
                        { name: "Link:", value: `https://en.wikipedia.org/wiki/${link}` },
                    )
                    .setTimestamp()
                    .setFooter(`Server name: ${message.guild.name}`); 
                message.channel.send(helpEmbed);
            });
        }
    },
};