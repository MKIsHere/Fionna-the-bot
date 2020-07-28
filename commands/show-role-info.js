const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
	if (!args[0]) {
		return message.channel.send("Ué, como vou procurar um cargo que não têm nome?");
	}

	var string = args.join(" ");
	var role = message.guild.roles.cache.find(r => r.name.toLowerCase() === string.toLowerCase());

	if (!role) {
		return message.channel.send(`Ixi, o cargo não foi encontrado, você pode ter digititado algo errado.. (${string})`)
	}

	var deleted = "não";
	var mentionable = "sim";
	var guildOwner = message.guild.members.cache.find(ow => ow.id === role.guild.ownerID);

	if (role.deleted) {
		deleted = "sim";
	} else {
		deleted = "não";
	}

	if (role.mentionable) {
		mentionable = "sim";
	} else {
		mentionable = "não";
	}
	var embed = new MessageEmbed()
		.setColor(role.color)
		.addField("ID", role.id)
		.addField("Nome", role.name)
		.addField("Deletado", deleted)
		.addField("Mencionável", mentionable)
		.addField("Permissões", role.permissions.bitfield)
		.addField("Cor", role.color)
		.addField("Posição", role.rawPosition)
		.setFooter(`Requested by ${message.author.nickname || message.author.username}`)
		.setTimestamp();

	return await message.channel.send(embed);
}

module.exports.help = {
	"name": "role-info",
	"altNames": ["show-role-info", "role"],
	"category": ["Admininstração"]
}