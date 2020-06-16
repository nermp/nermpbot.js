module.exports = {
	name: "uppercase",
	aliases: ["upper", "uc"],
	description: "Will convert all lowercase letters to uppercase.",
	execute(message, args) {
        const word = args.toString().split("");
        for (let i = 0; i < word.length; i++) {
            switch(word[i]) {
                case "a":
                    word[i] = "A";
                    break;
                case "b":
                    word[i] = "B";
                    break;
                case "c":
                    word[i] = "C";
                    break;
                case "d":
                    word[i] = "D";
                    break;
                case "e":
                    word[i] = "E";
                    break;
                case "f":
                    word[i] = "F";
                    break;
                case "g":
                    word[i] = "G";
                    break;
                case "h":
                    word[i] = "H";
                    break;
                case "i":
                    word[i] = "I";
                    break;
                case "j":
                    word[i] = "J";
                    break;
                case "k":
                    word[i] = "K";
                    break;
                case "l":
                    word[i] = "L";
                    break;
                case "m":
                    word[i] = "M";
                    break;
                case "n":
                    word[i] = "N";
                    break;
                case "o":
                    word[i] = "O";
                    break;
                case "p":
                    word[i] = "P";
                    break;
                case "q":
                    word[i] = "Q";
                    break;
                case "r":
                    word[i] = "R";
                    break;
                case "s":
                    word[i] = "S";
                    break;
                case "t":
                    word[i] = "T";
                    break;
                case "u":
                    word[i] = "U";
                    break;
                case "v":
                    word[i] = "V";
                    break;
                case "w":
                    word[i] = "W";
                    break;
                case "x":
                    word[i] = "X";
                    break;
                case "y":
                    word[i] = "Y";
                    break;
                case "z":
                    word[i] = "Z";
                    break;
                case ",":
                    word[i] = " ";
                    break;
            }
        }
        message.channel.send(word.join(""));
	},
};