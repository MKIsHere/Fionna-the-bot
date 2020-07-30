const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
	let prefix = client.db.fetch(`${message.guild.id}.prefix`) || client.config.prefix;
	let isAdmin = message.member.hasPermission("ADMINISTRATOR");
	let isInline = true;
	let language = client.db.fetch(`${message.guild.id}.language`) || 0;
	let langs = [
		["Português (Brasil)", "Brazilian Portuguese"],
		["Inglês", "English"]
	];

	let actualLanguage = langs[language][language];

	if (args[0]) {
		if (args[0].toLowerCase() === "prefix") {
			if (!isAdmin) {
				if (language === 0) {
					return message.channel.send(`Você não têm acesso à essa configuração.`);
				} else {
					return message.channel.send(`You do not have access to this setting.`);;
				}
			} // ADMIN CHECK

			let newPrefix = args[1];
			if (!args[1]) {
				return await message.channel.send(`${message.author.toString()}, meu prefixo atual é "**${prefix}**"!`);
			}

			if (newPrefix === "*") {
				return message.channel.send(`Cancelado.`).then(msg => client.setTimeout(() => {msg.delete()}, 1000));
			}

			let brackets = [
				`${client.dep.chalk.keyword("orange")("[")}`,
				`${client.dep.chalk.keyword("orange")("]")}`
			]

			try {
				await message.channel.send(`Meu prefixo mudou de "**${prefix}**" para "**${newPrefix}**"`);
				await client.db.set(`${message.guild.id}.prefix`, newPrefix);
				return await console.log(`${brackets[0]}${client.dep.chalk.green(message.guild.name)} (${client.dep.chalk.gray(message.guild.id)})${brackets[1]} Mudou de prefixo para "${newPrefix}"`);
			} catch (err) {
				return await console.error(err);
			}

		}
		if (args[0].toLowerCase() === "lang" || args[0].toLowerCase() === "language") {
			if (!isAdmin) {
				if (language === 0) {
					return message.channel.send(`Você não têm acesso à essa configuração.`);
				} else {
					return message.channel.send(`You do not have access to this setting.`);;
				}
			}
			if (!args[1]) {
				if (language === 0) {
					return message.channel.send(`Linguagens disponíveis: ${langs[0][language]}, ${langs[1][language]}.`);
				} else {
					return message.channel.send(`Available languages: ${langs[0][language]}, ${langs[1][language]}.`);
				}
			}
			if (!isNaN(args[1])) {
			client.db.set(`${message.guild.id}.language`, args[1]);
			if (language === 0) {
			return message.channel.send(`Agora a língua é ${langs[args[1]]}`);
			} else {
				return message.channel.send(`Now the language is ${langs[args[1]]}`);
			}
		} else {
			
			if (args[1] === "pt-br" || args[1] === "br" || args[1] === "portuguese" || args[1] === "brazilian portuguese") {
				client.db.set(`${message.guild.id}.language`, 0);
				return message.channel.send(`Agora a língua é ${langs[0][0]}`);
			} else if (args[1] === "en" || args[1] === "english" ) {
				client.db.set(`${message.guild.id}.language`, 1);
				return message.channel.send(`Now the language is ${langs[1][1]}`);
			} else {
				if (language === 0) {
					return message.channel.send(`Erro... essa linguagem não existe em minha base de dados!`);
				} else {
					return message.channel.send(`Error... this language does not exist in my database!`);
				}
			}
		}
		
			if (!isNaN(args[1]) && 1 < args[1]) {
				return message.channel.send(`Error... this language does not exist!`);
			}
		} else {
			if (language === 0) {
				return message.channel.send("Essa configuração não existe na minha base de dados!");
			} else {
				return message.channel.send("This configuration does not exist in my database!");
			}
		}
	}

	let embed = new MessageEmbed()
	.setTitle(`Configurações - ${message.guild.name}`)
	.addField(`Língua`, `${langs[language]}`)
	.addField(`Versão`, `${client.config.version}`)
	.setColor(client.colors[0].hex)
	.setTimestamp();

	if (language === 0) {
		embed = new MessageEmbed()
		.setTitle(`Configurações - ${message.guild.name}`)
		.addField(`Língua`, `${actualLanguage}`)
		.addField(`Versão`, `${client.config.version}`)
		.addField(`Prefixo`, `${prefix}`)
		.setColor(client.colors[0].hex)
		.setTimestamp();
	} else {
		embed = new MessageEmbed()
		.setTitle(`Settings - ${message.guild.name}`)
		.addField(`Language`, `${actualLanguage}`, isInline)
		.addField(`Version`, `${client.config.version}`, isInline)
		.addField(`Prefix`, `${prefix}`, isInline)
		.setColor(client.colors[0].hex)
		.setTimestamp();
	}

	return message.channel.send(embed);
}

module.exports.help = {
	"name": "config",
	"altNames": [
		"settings"
	],
	"category": [
		"Configurações",
		"Settings"
	],
	"admin": true
}