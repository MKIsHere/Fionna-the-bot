module.exports.run = async (client, message, args) => {
	if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Cê não manda em mim não, saco pela!");
	if (!args[0]) {
		return message.channel.send("Mencione alguém para expulsar.");
	}
	let member = message.mentions.members.first() || client.members.cache.get(args[0]);
	let user = message.mentions.users.first() || client.users.cache.get(args[0]);

	if (member === message.member) {
		return message.channel.send("Bobinho(a), você não pode expulsar você mesmo(a)");
	}

	var reason;
	let argsIndex = -1;
	args.forEach(a => {
		reason += a + " ";
		argsIndex += 1;
	});

	console.log(`Argumentos: ${argsIndex}`);

	if (reason) {
		member.kick(reason);
	} else {
		member.kick();
	}

	return message.channel.send(`Prontinho! ${user.username} teve o que mereceu!`);
}

module.exports.help = {
	"name": "kick",
	"admin": true
}