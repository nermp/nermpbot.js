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
				.setAuthor("nermpbot#8811", "https://cdn.discordapp.com/avatars/717820698977894471/13e45a6a5baef2be0f40fbbdd05477be.png")
				.setThumbnail("https://cdn.discordapp.com/attachments/717523101545660437/724729992348434452/5MCEddXFpb0AAAAAElFTkSuQmCC.png")
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
				.setAuthor("nermpbot#8811", "https://cdn.discordapp.com/avatars/717820698977894471/13e45a6a5baef2be0f40fbbdd05477be.png")
				.setThumbnail("https://cdn.discordapp.com/attachments/717523101545660437/724729992348434452/5MCEddXFpb0AAAAAElFTkSuQmCC.png")
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