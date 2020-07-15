module.exports = {
	name: "lowercase",
	aliases: ["lower", "lc"],
    description: "Will convert all uppercase letters to lowercase.",
    usage: "<message to turn to lowercase>",
	execute(message, args) {
        let letterMap = new Map([
            ["A", "a"],
            ["B", "b"],
            ["C", "c"],
            ["D", "d"],
            ["E", "e"],
            ["F", "f"],
            ["G", "g"],
            ["H", "h"],
            ["I", "i"],
            ["J", "j"],
            ["K", "k"],
            ["L", "l"],
            ["M", "m"],
            ["N", "n"],
            ["O", "o"],
            ["P", "p"],
            ["Q", "q"],
            ["R", "r"],
            ["S", "s"],
            ["T", "t"],
            ["U", "u"],
            ["V", "v"],
            ["W", "w"],
            ["X", "x"],
            ["Y", "y"],
            ["Z", "z"],
            [",", " "],
        ]);
        let word = "";
        if (!args.length) {
            //return message.reply("you need to put in text to emojify.");
            const filter = m => m.author.id === message.author.id;
            message.channel.send("What do you want to turn to lowercase?");
            const numMessageCollector = message.channel.createMessageCollector(filter, { time: 10000, max: 1 });
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
                word = numAdd.toString().split("");
                for (let x = 0; x < word.length; x++) {
                    if (letterMap.has(word[x])) {
                        word[x] = letterMap.get(word[x]);
                    }
                }
                message.channel.send(word.join(""));
            });
        } else { 
            word = args.toString().split("");
            for (let x = 0; x < word.length; x++) {
                if (letterMap.has(word[x])) {
                    word[x] = letterMap.get(word[x]);
                }
            }
            message.channel.send(word.join(""));
        }
	},
};