const { MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args) => {
	let user = message.author; let member = message.member;
	let channel = client.channels.cache.get("738113559875027075");
	let suggestion = args.join(" ");

	let trueEmoji = client.emojis.cache.get(emoji => emoji.id === "405337570952740864");
	let falseEmoji = client.emojis.cache.get(emoji => emoji.id === "403295315685539852");

	if (!trueEmoji) {
		trueEmoji = "👍";
	}
	if (!falseEmoji) {
		falseEmoji = "👎";
	}

	if (!args[0]) {
		return;
	}

	let suge = new MessageEmbed()
	.setAuthor(`${user.username}#${user.discriminator}`, user.displayAvatarURL({format: 'png', dynamic: true, size: 1024}))
	.setDescription(suggestion)
	.setColor(member.displayColor)
	.setTimestamp();

	await channel.send(suge).then(msg => msg.react(trueEmoji).then(reaction => reaction.message.react(falseEmoji).then(react => react.message.pin()))).catch(err => console.error(client.dep.chalk.red(err)));
}

module.exports.help = {
	"name": "suggest",
	"altNames": ["sugerir", "sug"]
}