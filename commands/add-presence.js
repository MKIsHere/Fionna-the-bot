module.exports.run = async (client, message, args) => {
	let content = args.join(" ");
	client.presences.array.push(content);
	client.db.set("presences", client.presences);
	console.log(`"${content}" agora está na lista de presenças.`);
	return message.channel.send("A presença foi adicionada a lista de presenças! ```"+ content +"```");
}

module.exports.help = {
	"name": "presence",
	"admin": true
}