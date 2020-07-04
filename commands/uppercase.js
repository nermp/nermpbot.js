module.exports = {
	name: "uppercase",
	aliases: ["upper", "uc"],
    description: "Will convert all lowercase letters to uppercase.",
    usage: "<message to capitalize>",
	execute(message, args) {
        if (!args.length) {
            return message.reply("you need to put in text to turn uppercase.");
        } else {
            const word = args.toString().split("");
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
            for (let x = 0; x < word.length; x++) {
                if (letterMap.has(word[x])) {
                    word[x] = letterMap.get(word[x]);
                }
            }
            message.channel.send(word.join(""));
        }
	},
};