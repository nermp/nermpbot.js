module.exports = {
	name: "lowercase",
	aliases: ["lower", "lc"],
	description: "Will convert all uppercase letters to lowercase.",
	execute(message, args) {
        const word = args.toString().split("");
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
        for (let x = 0; x < letterMap.size; x++) {
            if (letterMap.has(word[x])) {
                word[x] = letterMap.get(word[x]);
            }
        }
        message.channel.send(word.join(""));
	},
};