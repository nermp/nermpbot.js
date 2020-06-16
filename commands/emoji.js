module.exports = {
	name: "emoji",
	aliases: ["emo", "e"],
	description: "Will convert all standard letters and numbers to their corresponding emoji forms.",
	execute(message, args) {
        const word = args.toString().split("");
        for (let i = 0; i < word.length; i++) {
            switch(word[i]) {
                case "a":
                    word[i] = ":regional_indicator_a:";
                    break;
                case "b":
                    word[i] = ":regional_indicator_b:";
                    break;
                case "c":
                    word[i] = ":regional_indicator_c:";
                    break;
                case "d":
                    word[i] = ":regional_indicator_d:";
                    break;
                case "e":
                    word[i] = ":regional_indicator_e:";
                    break;
                case "f":
                    word[i] = ":regional_indicator_f:";
                    break;
                case "g":
                    word[i] = ":regional_indicator_g:";
                    break;
                case "h":
                    word[i] = ":regional_indicator_h:";
                    break;
                case "i":
                    word[i] = ":regional_indicator_i:";
                    break;
                case "j":
                    word[i] = ":regional_indicator_j:";
                    break;
                case "k":
                    word[i] = ":regional_indicator_k:";
                    break;
                case "l":
                    word[i] = ":regional_indicator_l:";
                    break;
                case "m":
                    word[i] = ":regional_indicator_m:";
                    break;
                case "n":
                    word[i] = ":regional_indicator_n:";
                    break;
                case "o":
                    word[i] = ":regional_indicator_o:";
                    break;
                case "p":
                    word[i] = ":regional_indicator_p:";
                    break;
                case "q":
                    word[i] = ":regional_indicator_q:";
                    break;
                case "r":
                    word[i] = ":regional_indicator_r:";
                    break;
                case "s":
                    word[i] = ":regional_indicator_s:";
                    break;
                case "t":
                    word[i] = ":regional_indicator_t:";
                    break;
                case "u":
                    word[i] = ":regional_indicator_u:";
                    break;
                case "v":
                    word[i] = ":regional_indicator_v:";
                    break;
                case "w":
                    word[i] = ":regional_indicator_w:";
                    break;
                case "x":
                    word[i] = ":regional_indicator_x:";
                    break;
                case "y":
                    word[i] = ":regional_indicator_y:";
                    break;
                case "z":
                    word[i] = ":regional_indicator_z:";
                    break;
                case "1":
                    word[i] = ":one:";
                    break;
                case "2":
                    word[i] = ":two:";
                    break;
                case "3":
                    word[i] = ":three:";
                    break;
                case "4":
                    word[i] = ":four:";
                    break;
                case "5":
                    word[i] = ":five:";
                    break;
                case "6":
                    word[i] = ":six:";
                    break;
                case "7":
                    word[i] = ":seven:";
                    break;
                case "8":
                    word[i] = ":eight:";
                    break;
                case "9":
                    word[i] = ":nine:";
                    break;
                case "0":
                    word[i] = ":zero:";
                    break;
                case ",":
                    word[i] = " ";
                    break;
            }
        }
        message.channel.send(word.join(""));
	},
};