const Discord = require("discord.js");
const { parse } = require("twemoji-parser");

module.exports.run = async (client, message, args) => {
    
    const emoji = args[0];
    if (!emoji) return message.channel.send("Nenhum emoji foi dado à mim!");

    let custom = Discord.Util.parseEmoji(emoji);
    const embed = new Discord.MessageEmbed()
    .setTitle(`${emoji}`)
    .setColor("#FFFF00");

    if (custom.id) {
        embed.setImage(`https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`);
        return message.channel.send(embed);
    }
    else {
        let parsed = parse(emoji, { assetType: "png" });
        if (!parsed[0]) return message.channel.send("Emoji inválido!");

        embed.setImage(parsed[0].url);
        return message.channel.send(embed);
    }

}

module.exports.help = {
    name: "emoji",
		altNames: [
			"enlarge"
		],
		category: [
			"Diversão",
			"Fun"
		]
};