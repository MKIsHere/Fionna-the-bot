module.exports.run = async (client, message, args) => {
	if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Isso é só para Deuses, jovem Mortal.");
	if (!args[0]) {
		return message.channel.send(`Uso: ${client.db.fetch(`${message.guild.id}.prefix`)}add-money <amount: Number> <user: @user>`);
	}

	let amount = args[0];
	if (isNaN(amount)) {
		return message.channel.send(`o "amount" têm que ser um número!`);
	} else if (amount === 0) {
		return message.channel.send(`o "amount" não pode ser ${amount}`);
	}

	let user = message.mentions.users.first() || client.users.cache.get(args[0]);
	if (!user) {
		return message.channel.send(`Você precisa mencionar alguém para adicionar ${client.currencyConfig.currency.name}!`);
	}

	try {
		let added = client.currency.addMoney(user.id, amount);

		return message.channel.send(`Foram adicionados ${client.currencyConfig.currency.simbolo}${added.amount} à Carteira de "${user.username}" no servidor **${message.guild.name}**.`);
	} catch (err) {
		return message.channel.send(`Não foi possível adicionar esta quantia (${client.currencyConfig.currency.simbolo}${amount}) à Carteira de ${user}`)
	}

}

module.exports.help = {
	"name": "add-money",
	"category": [
		"Economia",
		"Economy"
	],
	"admin": true
}