const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
	let isAdmin = message.member.hasPermission("ADMINISTRATOR");
	let language = client.db.fetch(`${message.guild.id}.language`) || 0;
	let langs = [
		["Português (Brasil)", "Brazilian Portuguese"],
		["Inglês", "English"]
	];

	let actualLanguage = langs[language][language];

	if (args[0]) {
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
		.setColor(client.colors[0].hex)
		.setTimestamp();
	} else {
		embed = new MessageEmbed()
		.setTitle(`Settings - ${message.guild.name}`)
		.addField(`Language`, `${actualLanguage}`)
		.addField(`Version`, `${client.config.version}`)
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
	]
}