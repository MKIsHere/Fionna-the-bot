module.exports.run = async (client, message, args) => {
	let prefix = client.db.fetch(`${message.guild.id}.prefix`) || client.config.prefix;
	let newPrefix = args.join(" ");
	if (!args[0]) {
		return await message.channel.send(`${message.author.toString()}, meu prefixo atual é "**${prefix}**"!`);
	}

	if (newPrefix === "*") {
		return;
	}

	let brackets = [
		`${client.dep.chalk.keyword("orange")("[")}`,
		`${client.dep.chalk.keyword("orange")("]")}`
	]

	try {
		await message.channel.send(`Seu prefixo mudou de "**${prefix}**" para "**${newPrefix}**"`);
		await client.db.set(`${message.guild.id}.prefix`, newPrefix);
		return await console.log(`${brackets[0]}${client.dep.chalk.green(message.guild.name)} (${client.dep.chalk.gray(message.guild.id)})${brackets[1]} Mudou de prefixo para "${newPrefix}"`);
	} catch (err) {
		return await message.channel.send("```" + err + "```");
	}
}

module.exports.help = {
	"name": "set-prefix",
	"altNames": ["prefix"],
	"category": ["Configuração", "Settings"]
}