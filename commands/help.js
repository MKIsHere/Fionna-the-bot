const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
	let language = await client.db.fetch(`language_${message.guild.id}`) || 0;
	let useEmbed = true;
	let commands = [];
	var commandIndex = 0;
	let embed = new MessageEmbed()
		.setDescription(`Comandos Disponíveis:`)
		.setTimestamp();


	if (commands) {
		client.commands.each(cmd => {
			if (!cmd.help.commandIndexOn) {
				commandIndex += 1;
				cmd.help.commandIndexOn = true;
			}
			var altNames, category, usage, command;
			if (!cmd.help.helpOn) {
				if (useEmbed) {
				if (cmd.help.altNames) {
				if (cmd.help.altNames[0]) {
					altNames = cmd.help.altNames[0];
					if (cmd.help.altNames[1]) {
						altNames = cmd.help.altNames[0] + ", " + cmd.help.altNames[1];
					}
				}
			}

			if (cmd.help.category) {
				if (cmd.help.category[language]) {
					category = cmd.help.category[language];
				}
			}
			if (cmd.help.usage) {
				if (cmd.help.usage[language]) {
					usage = cmd.help.category[language];
				}
			} 

			if (altNames) {
				if (usage) {
					if (category) {
						command = `[${category}] ${cmd.help.name} (${altNames}): ${usage} \n`;
					} else {
						command = `${cmd.help.name} (${altNames}): ${usage} \n`;
					}
				} else {
					if (category) {
						command = `[${category}] ${cmd.help.name} (${altNames}) \n`;
					} else {
						command = ` ${cmd.help.name} (${altNames}) \n`;
					}
				}
			} else {
				if (usage) {
					if (category) {
						command = `[${category}] ${cmd.help.name}: ${usage} \n`;
					} else {
						command = `${cmd.help.name}: ${usage} \n`;
					}
				} else {
					if (category) {
						command = `[${category}] ${cmd.help.name} \n`;
					} else {
						command = `${cmd.help.name} \n`;
					}
				}
			}

			} else {
				if (cmd.help.altNames) {
				if (cmd.help.altNames[0]) {
					altNames = cmd.help.altNames[0];
					if (cmd.help.altNames[1]) {
						altNames = cmd.help.altNames[0] + ", " + cmd.help.altNames[1];
					}
				}
			}

			if (cmd.help.category) {
				if (cmd.help.category[language]) {
					category = cmd.help.category[language];
				}
			}
			if (cmd.help.usage) {
				if (cmd.help.usage[language]) {
					usage = cmd.help.category[language];
				}
			} 

			if (altNames) {
				if (usage) {
					if (category) {
						command = `[${category}] ${commandIndex}.		${cmd.help.name} (${altNames}): ${usage} \n`;
					} else {
						command = `${commandIndex}.		${cmd.help.name} (${altNames}): ${usage} \n`;
					}
				} else {
					if (category) {
						command = `[${category}] ${commandIndex}.		${cmd.help.name} (${altNames}) \n`;
					} else {
						command = `${commandIndex}.		${cmd.help.name} (${altNames}) \n`;
					}
				}
			} else {
				if (usage) {
					if (category) {
						command = `[${category}] ${commandIndex}.		${cmd.help.name}: ${usage} \n`;
					} else {
						command = `${commandIndex}.		${cmd.help.name}: ${usage} \n`;
					}
				} else {
					if (category) {
						command = `[${category}] ${commandIndex}.		${cmd.help.name} \n`;
					} else {
						command = `${commandIndex}.		${cmd.help.name} \n`;
					}
				}
			}}
			}
			if (useEmbed) {
				if (!cmd.help.helpOn) {
					embed.addField(`${commandIndex}.`, command, true);
					
					cmd.help.helpOn = true;
				} else {
					cmd.help.helpOn = false;
				}
			} else {
				if (!cmd.help.helpOn) {
					commands.push(command);
					embed = new MessageEmbed()
						.setDescription(`Comandos Disponíveis: ***${commands}***.`)
						.setTimestamp();
						
					cmd.help.helpOn = true;
			} else {
				cmd.help.helpOn = false;
			}}

		})};

	return message.channel.send(embed);
}

module.exports.help = {
	"name": "help"
}