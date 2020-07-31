/**
 * O Comando Help envia uma mensagem de ajuda.
 * Contendo as informações dos comandos.
 */

module.exports.run = async (client, message, args) => {
	let language = await client.db.fetch(`${message.guild.id}.language`) || 0;
	let point = [
		".",
		"..",
		"...",
		".",
		"..",
		"...",
		".",
		"..",
		"...",
		".",
		"..",
		"...",
		".",
		"..",
		"...",
		".",
		"..",
		"..."
	]
	let rand = client.Random.int(0, 2);


	let reactEmoji = "❗";
	let seconds = 0;
	return message.channel.send(`Loading...`).then(msg => client.setTimeout(() => {msg.edit(`Carregando...`).then(ms => ms.react(reactEmoji).then(m => client.setInterval(() => {
		
		if (seconds >= 61) return;
		if (seconds >= 60) return msg.edit(`Comi o cu de quem tá lendo. lmao`);
		rand = client.Random.int(0, 2);
		msg.edit(`Loading${point[rand]}`);
		seconds += 1;
		console.log(seconds + " segundos");
	}, 1000)))}, 3000))
};

module.exports.help = {
    name: 'help',
    category: ['Ajuda', 'Help'],
    description: 'Mostra todos os comandos disponíveis da Fionna.',
    usage: 'help'
};