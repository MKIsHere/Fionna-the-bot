const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
	var user = message.author;
	var member = message.member;

	var string = args.join(" ");
	var colors = [
		{name: "Verde Menta", id: "736303802420035594"},
		{name: "Pinky", id: "736303806639374357"},
		{name: "Azul Bebê", id: "736304433838817370"},
		{name: "Azul", id: "736304563774029967"},
		{name: "Ciano", id: "736304499383074907"},
		{name: "Cyan", id: "736304499383074907"},
		{name: "Verde Claro", id: "736304134155927574"},
		{name: "Verde Escuro", id: "736304200769863847"},
		{name: "Branco", id: "736304755105857536"},
		{name: "Preto", id: "736304710121685002"},
		{name: "Vermelho", id: "736303808870875207"},
		{name: "Rosa", id:"736303808346587168"},
		{name: "Magenta", id: "736303807948128298"},
		{name: "Laranja", id: "736304278796239010"},
		{name: "Roxo", id: "736423733442510889"}
	];

	var names = colors.map(function(item) {
		return item["name"].toLowerCase();
	});
	var ids = colors.map(function(item) {
		return item["id"];
	});

	var role = message.guild.roles.cache.find(r => r.name.toLowerCase() === string.toLowerCase());

	if (!args[0]) {
		return await message.channel.send("Opa, você têm que escolher uma das cores... Se precisar de ajuda, vá no canal " + client.channelsObj.search("cores")).then(msg => msg.channel.send(new MessageEmbed().setTitle("Cores").setDescription(names)));
	} else if (args[0].toLowerCase() === "remove") {
		await member.roles.remove(ids);
		await client.logs.addLog(`Todas as cores de ${user} foram removidas `, user, client.channelsObj.search("logs"));
		return await message.channel.send(`${user.toString()} agora você não têm mais cores!`);
	} else {
		try {
			if (!names.includes(string.toLowerCase()) || !role) {
				return await message.channel.send(`${user.toString()} eh... Esse cargo não existe ou não é uma cor. Pesquisei por "${string}". Veja se está correto.`).then(msg => msg.channel.send(new MessageEmbed().setTitle("Cores").setDescription(names).setColor('RANDOM')));
				} 
			await member.roles.remove(ids);
			await member.roles.add(role);
			if (role) {
				await client.logs.addLog(`Ganhou a cor ${role.name}!`, message.author, client.channelsObj.search("logs"));
				console.log(`${client.logs.brackets[0]}"${client.dep.chalk.keyword("yellow")(role.guild.name)}" (${client.dep.chalk.keyword("gray")(role.guild.id)})${client.logs.brackets[1]} ${user.username} (${client.dep.chalk.keyword("gray")(user.id)}) ganhou o cargo ${client.dep.chalk.hex(role.color)(role.name)} (${client.dep.chalk.keyword("gray")(role.id)})`);
				return await message.channel.send(`${user.toString()}, prontinho! A sua cor "${role.name}" já está aí!`);
			}
		} catch (err) {
			console.log(client.dep.chalk.red("Erro: " + err));
			await message.channel.send("Eh... que embaraçoso... meio que eu tive um probleminha.. Espera um pouco aí, beleza?");
			var randomNumber = client.Random.int(0, 1000);
			if (randomNumber === 1000 || randomNumber === 500) {
				return await message.channel.send("Aliás, se isso continuar acontecendo... Chama a minha mamãe!");
			}
		}
	}

	/* if (role === null) {
		return await message.channel.send(`${user.toString()} eh... Esse cargo não existe, pesquisei por "${string}". Veja se está correto.`);
	} */


}

module.exports.help = {
	"name":"color"
}