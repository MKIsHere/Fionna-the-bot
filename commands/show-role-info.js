const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
	let language = client.db.fetch(`${message.guild.id}.language`) || 0;
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

  let memberCount = role.members.size || 0;

	if (role.deleted) {
		deleted = ["sim", "yes"];
	} else {
		deleted = ["não", "no"];
	}

	if (role.mentionable) {
		mentionable = ["sim", "yes"];
	} else {
		mentionable = ["não", "no"];
	}
	let embed = new MessageEmbed()
		.setColor(role.color)
		.setFooter(`Requested by ${message.author.nickname || message.author.username}`)
		.setTimestamp();

		if (language === 0) {
			embed = new MessageEmbed()
		.setColor(role.color)
		.addField("ID", role.id)
		.addField("Nome", role.name)
		.addField("Deletado", deleted[language])
		.addField("Mencionável", mentionable[language])
		.addField("Permissões", role.permissions.bitfield)
		.addField("Cor", role.color)
		.addField("Posição", role.rawPosition)
		.addField("Membros", memberCount)
		.setFooter(`Requested by ${message.author.nickname || message.author.username}`)
		.setTimestamp();
		} else {
			embed = new MessageEmbed()
		.setColor(role.color)
		.addField("ID", role.id)
		.addField("Name", role.name)
		.addField("Deleted", deleted[language])
		.addField("Mentionable", mentionable[language])
		.addField("Permissions BitField", role.permissions.bitfield)
		.addField("Color", role.color)
		.addField("Position (RAW)", role.rawPosition)
		.addField("Members", memberCount)
		.setFooter(`Requested by ${message.member.nickname || message.author.username}`)
		.setTimestamp();
		}


	return await message.channel.send(embed);
}

module.exports.help = {
	"name": "role-info",
	"altNames": ["show-role-info", "role"],
	"category": ["Admininstração"],
	"admin": true,
	"description": ["Mostra as informações de um cargo. retorna uma embed com todas as informações do cargo, sem necessidade de marcar o cargo"]
}