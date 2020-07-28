module.exports.run = async (client, message, args) => {
	let language = client.db.fetch(`${message.guild.id}.language`) || 0;
	let errors = {
		mention: [
			"você precisa marcar alguém para roubar",
			"CAN'T CONNECT TO DATABASE"
		]
	};


	if (!args[0]) {
		return message.channel.send(`${message.author.toString()}, `+ errors.mention[language]);
	}
	let user = message.mentions.users.first() || client.users.cache.get(args[0]);

	let money = client.currency.fetchMoney(user.id);

	let loseChance = client.Random.int(0, 100);
	let amount = money.balance * loseChance / 2;
	if (!amount) {
		amount.balance = 250;
	}
	if (amount <= 0) {
			amount = money.balance + 10;
		}
	try {
		if (loseChance > 50) {
			client.currency.removeMoney(user.id, amount);
			client.currency.addMoney(message.author.id, amount);
			return message.channel.send(`Você conseguiu roubar ${client.currencyConfig.currency.simbolo}${amount.toString()} de ${user.username} com sucesso!`);
		} else if (loseChance < 50) {
			var loseAmount = amount / client.Random.int(1, 10);
			if (loseAmount === amount / 1) {
				loseAmount = amount / 1 - 10;
			} else if (loseAmount < 10) {
				loseAmount = amount + 250;
			}
			client.currency.removeMoney(user.id, loseAmount);
			return message.channel.send(`Não! roubar é feio. você perdeu ${client.currencyConfig.currency.simbolo}${loseAmount}`);
		} else {
			client.currency.addMoney(message.author.id, amount / 2 + 500);
			client.currency.addMoney(user.id, amount / 2 + 500);
			return message.channel.send(`Você tentou roubar ${user.username}, mas acabou que vocês se gostaram e agora ambos ganharam ${amount / 2 + 500} após roubarem um banco.`);
		}
	} catch (err) {
		console.log(client.dep.chalk.red(err));
		return message.channel.send(`\`\`\`js
		let error = '${err}';
		\`\`\``);
	}
}

module.exports.help = {
	"name": "rob",
	"altNames": ["roubar"],
	"category": [
		"Economia",
		"Economy"
	]
}