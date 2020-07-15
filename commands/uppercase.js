module.exports = {
	name: "uppercase",
	aliases: ["upper", "uc"],
    description: "Will convert all lowercase letters to uppercase.",
    usage: "<message to capitalize>",
	execute(message, args) {
        let letterMap = new Map([
            ["a", "A"],
            ["b", "B"],
            ["c", "C"],
            ["d", "D"],
            ["e", "E"],
            ["f", "F"],
            ["g", "G"],
            ["h", "H"],
            ["i", "I"],
            ["j", "J"],
            ["k", "K"],
            ["l", "L"],
            ["m", "M"],
            ["n", "N"],
            ["o", "O"],
            ["p", "P"],
            ["q", "Q"],
            ["r", "R"],
            ["s", "S"],
            ["t", "T"],
            ["u", "U"],
            ["v", "V"],
            ["w", "W"],
            ["x", "X"],
            ["y", "Y"],
            ["z", "Z"],
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