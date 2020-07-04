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
            ["%27", ""],
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
                let otherLink = decodeURIComponent(result.name).split("");
                for (let x = 0; x < otherLink.length; x++) {
                    if (letterMap.has(otherLink[x])) {
                        otherLink[x] = letterMap.get(otherLink[x]);
                        if (otherLink[x].includes(",")) {
                            otherLink[x].replace(",", "");
                        }
                    }
                }
                otherLink = otherLink.join("");
                otherLink = otherLink.split(" ");
                otherLink = otherLink.join("-");
                let link = otherLink.toLowerCase().split("");
                for (let i = 0; i < otherLink.split("-").length; i++) {
                    for (let x = 1; x < link.length; x++) {
                        if (link[x].toString() == "-" && link[x - 1].toString() == "-") {
                            console.log(link[x] + " and " + link[x - 1]);
                            link.splice(x, 1);
                            x = x - 1;
                        }
                    }
                }
                link = `https://knowyourmeme.com/memes/${link.join("")}`;
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
        } else {
            kym.search(args.toString()).then((result) => {
                let otherLink = decodeURIComponent(result.name).split("");
                for (let x = 0; x < otherLink.length; x++) {
                    if (letterMap.has(otherLink[x])) {
                        otherLink[x] = letterMap.get(otherLink[x]);
                        if (otherLink[x].includes(",")) {
                            otherLink[x].replace(",", "");
                        }
                    }
                }
                otherLink = otherLink.join("");
                otherLink = otherLink.split(" ");
                otherLink = otherLink.join("-");
                let link = otherLink.toLowerCase().split("");
                for (let i = 0; i < otherLink.split("-").length; i++) {
                    for (let x = 1; x < link.length; x++) {
                        if (link[x].toString() == "-" && link[x - 1].toString() == "-") {
                            console.log(link[x] + " and " + link[x - 1]);
                            link.splice(x, 1);
                            x = x - 1;
                        }
                    }
                }
                link = `https://knowyourmeme.com/memes/${link.join("")}`;
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