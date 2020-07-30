const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
	var img;
	if (message.mentions.users.first()) {
		let user = message.mentions.users.first() ||
    client.users.cache.get(args[0]) ||
    match(args.join(" ").toLowerCase(), message.guild) ||
    message.author;
		let avatar = user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }) || client.rankConfig.defaultRankAvatar;

		img = await client.canvas.trigger(avatar);
	} else {
		img = null;
	}

	return await message.channel.send(new Discord.MessageAttachment(img, "triggered.gif"));
}

module.exports.help = {
	"name": "triggered",
	"altNames": ["trigger"]
}