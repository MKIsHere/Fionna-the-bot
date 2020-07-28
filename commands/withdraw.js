module.exports.run = async (client, message, args) => {
	let user = message.author;
	let money = client.currency.fetchMoney(user.id);
	let amount = args.join(" ");
	let withdrawMaximum = 50000;
	if (Number.isNaN(amount)) {
		return await message.channel.send("Isso não é um número!");
	}
	if (money.bank <= 0) {
		return await message.channel.send(`Você não têm ${client.currencyConfig.currency.name} em banco.`);
	}
	if (money.bank < amount) {
		return await message.channel.send(`Você não têm ${client.currencyConfig.currency.name} o suficente em banco.`);
	}

	if (amount > withdrawMaximum) {
		return await message.channel.send(`Só é possível sacar até **${client.currencyConfig.currency.simbolo}${withdrawMaximum.toLocaleString()}**.`);
	}

	if (amount === "all" || amount === "tudo") {
		try {
			await client.currency.withdrawMoney(user.id, money.bank);
			return await message.channel.send("Prontinho, todo o dinheiro foi pra Carteira!");
		} catch {
			return await message.channel.send("Você não têm nada em banco.");
		}
	}

	try {
		await client.currency.withdrawMoney(user.id, amount);
		return await message.channel.send(`Você acaba de sacar ${client.currencyConfig.currency.simbolo}${amount.toLocaleString()}`);
	} catch (err) {
		await console.log(client.dep.chalk.red("ERRO: " + err));
		await client.logs.addLog(`Erro: ${err} ao tentar Sacar dinheiro, no canal ${message.channel}`, client.user, client.channels.search("logs"));
		return await message.channel.send("Um erro ocorreu, tente novamente.");
	}
}

module.exports.help = {
	"name": "withdraw",
	"altNames": [
		"with",
		"sacar"
	],
	"category": [
		"Economia",
		"Economy"
	]
}