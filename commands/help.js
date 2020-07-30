/**
 * O Comando Help envia uma mensagem de ajuda.
 * Contendo as informações dos comandos.
 */

module.exports.run = async (client, message, args) => {
	let language = await client.db.fetch(`${message.guild.id}.language`) || 0;
	let prefix = await client.db.fetch(`${message.guild.id}.prefix`) || client.config.prefix;
    /** Objeto embed que irá ser enviado. */
    const embed = {
      color: client.colors[0].hex,
      title: 'Minha lista de comandos',
      description: `[Clique aqui para ir até o repositório onde estou :heart:](https://github.com/MKIsHere/Fionna-the-bot)\nAh, meu prefixo é ${prefix}`,
      timestamp: new Date(),
      footer: {
        text: '2020 ® Liga dos Programadores, GokuroHype'
      },
      fields: []
    }

    let commands = client.commands;

    if (message.member === null || !message.member.hasPermission('ADMINISTRATOR')) commands = commands.filter(c => !c.help.admin);

    commands.forEach(command => {
      if (command.alias) return
      if (command.help.name != "help" && !command.help.isInHelp) {
				if (command.help.descripton) {
					if (command.help.category && command.help.category[language]) {
						embed.fields.push({
        name: `${command.help.name}`,
        value: `**Descrição**: ${command.help.description[language]}
        **Categoria**: ${command.help.category[language]}\n`,
				inline: true
      });
			command.help.isInHelp = true;
					}} else {
				if (command.help.category && command.help.category[language]) {
					embed.fields.push({
        name: `${command.help.name}`,
        value: `**Categoria**: ${command.help.category[language]}\n`,
				inline: true
      	});
				command.help.isInHelp = true;
				}
			}
			} else {
				command.help.isInHelp = false;
			}
    });

    message.author.send({
      embed: embed
    }).then(() => message.react('⚡')).catch(() => message.reply('eu não tenho permissões para enviar DM para você 😥'))
};

module.exports.help = {
    name: 'help',
    category: ['Ajuda', 'Help'],
    description: 'Mostra todos os comandos disponíveis da Fionna.',
    usage: 'help'
};