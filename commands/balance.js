const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
	let language = client.db.fetch(`${message.guild.id}.language`) || 0;
	let user =
    message.mentions.users.first() ||
    client.users.cache.get(args[0]) ||
    message.author;

	if (user.bot) {
		if (language === 0) {
			return message.channel.send(`Ooops, Bots guardam dinheiro em uma central digital inacessível pra mim, sorry ${message.author.username}-Senpai!`);
		}
	}

	let money = client.currency.fetchMoney(user.id);

	let rank = 1;
	let lb = client.currency.leaderboard({ limit: 10, raw: false});
	lb.forEach(u => {
		if (u.id === user.id) {
			rank = u.position;
		}
	})

	let avatar = user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
	let embed = new MessageEmbed()
	.setAuthor(`${user.username}#${user.discriminator}`, avatar)
	.setDescription(`Leaderboard RANK: ${rank}`)
	.addField("Carteira", `${client.currencyConfig.currency.simbolo}${money.balance}`, true)
	.addField("Banco", `${client.currencyConfig.currency.simbolo}${money.bank}`, true)
	.addField("Total", `${client.currencyConfig.currency.simbolo}${money.balance + money.bank}`, true)
	.setFooter("Requested by " + message.author.username)
	.setColor(client.colors[0].hex)
	.setTimestamp();

	if (language === 0) {
		embed = new MessageEmbed()
	.setAuthor(`${user.username}#${user.discriminator}`, avatar)
	.setDescription(`Leaderboard RANK: ${rank}`)
	.addField("Carteira", `${client.currencyConfig.currency.simbolo}${money.balance}`, true)
	.addField("Banco", `${client.currencyConfig.currency.simbolo}${money.bank}`, true)
	.addField("Total", `${client.currencyConfig.currency.simbolo}${money.balance + money.bank}`, true)
	.setFooter("Requested by " + message.author.username)
	.setColor(client.colors[0].hex)
	.setTimestamp();
	} else {
		embed = new MessageEmbed()
	.setAuthor(`${user.username}#${user.discriminator}`, avatar)
	.setDescription(`Leaderboard RANK: ${rank}`)
	.addField("Wallet", `${client.currencyConfig.currency.simbolo}${money.balance}`, true)
	.addField("Bank", `${client.currencyConfig.currency.simbolo}${money.bank}`, true)
	.addField("Net Worth", `${client.currencyConfig.currency.simbolo}${money.balance + money.bank}`, true)
	.setFooter("Requested by " + message.author.username)
	.setColor(client.colors[0].hex)
	.setTimestamp();
	}
	
	return message.channel.send(embed);
}

module.exports.help = {
	"name": "balance",
	"altNames": ["bal", "money"],
	"category": [
		"Economia",
		"Economy"
	]
}