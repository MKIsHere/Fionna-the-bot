const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
	let user = message.author;
	let money = await client.currency.fetchMoney(user.id);
	let amount = args.join(" ");

	if (money.balance <= 0) {
		return await message.channel.send("Você não têm dinheiro pra depositar!");
	}

	if (!args[0]) {
		return message.channel.send("Você não pode depositar nada.");
	} 
	if (Number.isNaN(amount)) {
		return await message.channel.send("Isso não é um número.");
	}
	if (amount.toLowerCase() === "all" || amount.toLowerCase() === "tudo") {
		await client.currency.depositMoney(user.id, money.balance);

		return await message.channel.send("Você acaba de depositar todo seu dinheiro com sucesso");
	}

	await client.currency.depositMoney(user.id, amount);

	return await message.channel.send(`Você acaba de depositar ${amount} ${client.currencyConfig.currency.name}`);
}

module.exports.help = {
	"name": "deposit",
	"altNames": ["dep", "depositar"],
	"category": [
		"Economia",
		"Economy"
	]
}