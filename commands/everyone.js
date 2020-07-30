module.exports.run = async (client, message, args) => {
	if (!message.member.permissions.has('ADMINISTRATOR')) return;

	message.delete()
	return message.channel.send("@everyone").then(msg => msg.delete());
}

module.exports.help = {
	"name": "everyone"
}