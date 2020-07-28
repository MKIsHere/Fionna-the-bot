const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("MANAGE_MESSAGES"))
    return client.channelsObj.reply("eh... sorry, mas você não pode `Gerenciar Mensagens`...", message);
  const deleteCount = parseInt(args[0], 10);
  if (!deleteCount || deleteCount < 1 || deleteCount > 99)
    return client.channelsObj.reply("faz o seguinte, me dá um número de 1 à 99 pra eu poder deletar aqui", message);

  var fetched = await message.channel.messages.fetch({
    limit: deleteCount + 1
  });

	var deleteAuthorMessage = true;
	
	if (deleteAuthorMessage) {
		fetched = await message.channel.messages.fetch({
			limit: deleteCount + 1
		});
	} else {
		fetched = await message.channel.messages.fetch({
			limit: deleteCount
		});
	}
  message.channel.bulkDelete(fetched);
  message.channel
    .send(`***${args[0]}** mensagens limpas nesse chat!*`).then(msg => msg.delete({timeout: 5000}))
    .catch(error =>
      console.log(`Não foi possível deletar mensagens devido a: ${error}`)
    );
   client.logs.addLog(`${deleteCount} mensagens foram deletadas em ${message.channel} por ${message.author.username}#${message.author.discriminator}`, message.author, client.channelsObj.search("logs"));
};

module.exports.help = {
    "name": "clear",
		"altNames": ["purge"],
		"category": ["Admininstração"] // 0: PT-BR, 1: EN
};