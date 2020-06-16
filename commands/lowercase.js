module.exports = {
	name: "lowercase",
	aliases: ["lower", "lc"],
	description: "Will convert all uppercase letters to lowercase.",
	execute(message, args) {
        const word = args.toString().split("");
        for (let i = 0; i < word.length; i++) {
            switch(word[i]) {
                case "A":
                    word[i] = "a";
                    break;
                case "B":
                    word[i] = "b";
                    break;
                case "C":
                    word[i] = "c";
                    break;
                case "D":
                    word[i] = "d";
                    break;
                case "E":
                    word[i] = "e";
                    break;
                case "F":
                    word[i] = "f";
                    break;
                case "G":
                    word[i] = "g";
                    break;
                case "H":
                    word[i] = "h";
                    break;
                case "I":
                    word[i] = "i";
                    break;
                case "J":
                    word[i] = "j";
                    break;
                case "K":
                    word[i] = "k";
                    break;
                case "L":
                    word[i] = "l";
                    break;
                case "M":
                    word[i] = "m";
                    break;
                case "N":
                    word[i] = "n";
                    break;
                case "O":
                    word[i] = "o";
                    break;
                case "P":
                    word[i] = "p";
                    break;
                case "Q":
                    word[i] = "q";
                    break;
                case "R":
                    word[i] = "r";
                    break;
                case "S":
                    word[i] = "s";
                    break;
                case "T":
                    word[i] = "t";
                    break;
                case "U":
                    word[i] = "u";
                    break;
                case "V":
                    word[i] = "v";
                    break;
                case "W":
                    word[i] = "w";
                    break;
                case "X":
                    word[i] = "x";
                    break;
                case "Y":
                    word[i] = "y";
                    break;
                case "Z":
                    word[i] = "z";
                    break;
                case ",":
                    word[i] = " ";
                    break;
            }
        }
        message.channel.send(word.join(""));
	},
};