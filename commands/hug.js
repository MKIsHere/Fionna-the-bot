const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
		let language = client.db.fetch(`${message.guild.id}.language`) || 0;

  	var list = [
    "https://cdn.jsdelivr.net/gh/MKIsHere/my-bff-bot/gifs/hug/hug_0.gif",
		"https://cdn.jsdelivr.net/gh/MKIsHere/my-bff-bot/gifs/hug/hug_1.gif",
		"https://cdn.jsdelivr.net/gh/MKIsHere/my-bff-bot/gifs/hug/hug_2.gif",
		"https://cdn.jsdelivr.net/gh/MKIsHere/my-bff-bot/gifs/hug/hug_3.gif"
  ];

	console.log(client.dep.chalk.keyword("yellow")("[CDN]") + " Arquivos da CDN carregados.");

  var rand = list[client.Random.int(0, list.length)];
  let user = message.mentions.users.first() || client.users.cache.get(args[0]);
  if (!user) {
    if (language === 0) {
			return message.reply(
      "lembre-se de mencionar um usuário válido para abraçar!"
    );} else {
			return message.reply(
      "remember to mention a valid user to hug!"
    );
		}
  }
  /*
message.channel.send(`${message.author.username} **acaba de beijar** ${user.username}! :heart:`, {files: [rand]});
*/
  let avatar = message.author.displayAvatarURL({ format: "png", dynamic: true });
	
	
	if (language === 0) {
		let embed = new Discord.MessageEmbed()
    .setTitle("ABRAÇOS QUENTINHOS!!!!")
    .setColor(process.env.EMBED_COLOR)
    .setDescription(`${message.author} acaba de abraçar ${user}`)
    .setImage(rand)
    .setTimestamp()
    .setThumbnail(avatar)
    .setFooter("Ownnnnt! Que abraço quentinho....")
    .setAuthor(message.author.tag, avatar);
		if (user === client.user) {
			embed = new Discord.MessageEmbed()
    	.setTitle("E-Eu tô ficando vermelha de novo...")
    	.setColor(process.env.EMBED_COLOR)
    	.setDescription(`${message.author} a-acaba d-de me abraçar...`)
    	.setImage(rand)
    	.setTimestamp()
    	.setThumbnail(avatar)
    	.setFooter("A-Até que foi um bom abraço...")
    	.setAuthor(message.author.tag, avatar);
		} else if (user === message.author) {
			embed = new Discord.MessageEmbed()
    .setTitle("Eh... estranho.. mas.. ABRAÇOS!")
    .setColor(process.env.EMBED_COLOR)
    .setDescription(`${message.author} acaba de abraçar à si mesmo(a)... estranho..`)
    .setImage(rand)
    .setTimestamp()
    .setThumbnail(avatar)
    .setFooter("Ownnnnt! Que abraço quentinho....")
    .setAuthor(message.author.tag, avatar);
		}

		return await message.channel.send(embed);
	} else {
		var embed = new Discord.MessageEmbed()
    .setTitle("WARM HUGS!!!")
    .setColor(process.env.EMBED_COLOR)
    .setDescription(`${message.author} has just embraced ${user}`)
    .setImage(rand)
    .setTimestamp()
    .setThumbnail(avatar)
    .setFooter("Ownnnnt! What a warm hug....")
    .setAuthor(message.author.tag, avatar);

		return await message.channel.send(embed);
	}

};

module.exports.help = {
	"name": "hug",
	"category": [ "Diversão",	"Fun" ]
}