const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args) => {
	if (!args[0]) return message.channel.send("Eh... então nada muda sua mente? OK então....");
	let text = "";
		args.forEach(arg => {
			text += arg + " ";
		});
	let image = await client.canvas.changemymind(text);

	console.log("Supimpa! Mude minha mente!");
	
	return message.channel.send(`${message.author.toString()} ${new MessageAttachment(image, "changemymind.png")}`);
}
module.exports.help = {
	"name": "changemymind"
}