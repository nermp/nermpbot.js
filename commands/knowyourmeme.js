const Discord = require("discord.js");
const kym = require("nodeyourmeme");

module.exports = {
    name: "knowyourmeme",
    aliases: ["kym", "knowmeme", "meme"],
	description: `Finds the definition of a random meme, but you can also search for a specific meme.`,
    usage: "<optional search term>",
    execute(message, args) {
        let letterMap = new Map([
            ["#", ""],
            ["*", ""],
            [".", ""],
            ["`", ""],
            ['"', ""],
            ["'", ""],
            ["/", ""],
            [",", ""],
            ["&", ""],
            ["!", ""],
            ["@", ""],
            ["$", ""],
            ["%", ""],
            ["^", ""],
            ["(", ""],
            [")", ""],
            ["=", ""],
            ["_", ""],
            ["+", ""],
            ["{", ""],
            ["}", ""],
        ]);
        if (!args.length) {
            kym.random().then((result) => {
                let link = result.name.toLowerCase().split(" ");
                for (let x = 0; x < letterMap.size; x++) {
                    if (letterMap.has(link[x])) {
                        link[x] = letterMap.get(link[x]);
                    }
                }
                link = link.join("-");
                link = `https://knowyourmeme.com/memes/${link}`;
				const memeEmbed = new Discord.MessageEmbed()
				.setColor("#0000FF")
				.setTitle("Know Your Meme Search")
				.setAuthor("nermpbot#8811", "https://i.imgur.com/paVWNPD.png")
				.setThumbnail("https://i.imgur.com/2JzZYfF.png")
				.setTimestamp()
				.addFields(
					{ name: "Meme:", value: result.name },
                    { name: "Definition:", value: result.about },
                    { name: "Link:", value: link },
				)
				.setFooter(`Server name: ${message.guild.name}`); 
				message.channel.send(memeEmbed);
			}).catch((error) => {
				console.error(error);
            });        
        } else{
            kym.search(args.toString()).then((result) => {
                let link = result.name.toLowerCase().split(" ");
                for (let x = 0; x < letterMap.size; x++) {
                    if (letterMap.has(link[x])) {
                        link[x] = letterMap.get(link[x]);
                    }
                }
                link = link.join("-");
                link = `https://knowyourmeme.com/memes/${link}`;
				const memeEmbed = new Discord.MessageEmbed()
				.setColor("#0000FF")
				.setTitle("Know Your Meme Search")
				.setAuthor("nermpbot#8811", "https://i.imgur.com/paVWNPD.png")
				.setThumbnail("https://i.imgur.com/2JzZYfF.png")
				.setTimestamp()
				.addFields(
					{ name: "Meme:", value: result.name },
                    { name: "Definition:", value: result.about },
                    { name: "Link:", value: link },
				)
				.setFooter(`Server name: ${message.guild.name}`); 
				message.channel.send(memeEmbed);
			}).catch((error) => {
				console.error(error);
            });        
        }
    },
};