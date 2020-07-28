const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {

var list = [
  "https://i.imgur.com/uobBW9K.gif",
    "https://imgur.com/lYQt9rx.gif",
    "https://imgur.com/w1TU5mR.gif",
    "https://i.imgur.com/FozOXkB.gif",
    "https://i.imgur.com/eKcWCgS.gif",
    "https://i.imgur.com/MzAjNdv.gif",
    "https://i.imgur.com/II1bakc.gif",
    "https://i.imgur.com/i1PIph3.gif",
    "https://i.imgur.com/sZhtvBR.gif",
    "https://i.imgur.com/So3TIVK.gif",
    "https://i.imgur.com/q340AoA.gif",
    "https://i.imgur.com/OjTBV8G.gif",
    "https://i.imgur.com/SeCRpPp.gif",
    "https://i.imgur.com/9R4XQIv.gif",
    "https://i.imgur.com/FVlX0Vs.gif",
    "https://i.imgur.com/6nCt4eb.gif",
    "https://i.imgur.com/9758cJX.gif",
    "https://i.imgur.com/b3KBV8i.gif",
    "https://i.imgur.com/AOpGwmX.gif",
    "https://i.imgur.com/hwrhrWZ.gif",
    "https://i.imgur.com/KAmjoLO.gif",
    "https://i.imgur.com/zIRUUFM.gif",
    "https://i.imgur.com/SS7sQpj.gif",
    "https://i.imgur.com/ltDNY6b.gif",
    "https://i.imgur.com/THyefKo.gif",
    "https://i.imgur.com/QETjUCT.gif",
    "https://i.imgur.com/6rcNk2o.gif",
    "https://i.imgur.com/wgpSUR5.gif",
    "https://i.imgur.com/fXh0i2H.gif",
    "https://i.imgur.com/L0ujw2R.gif",
    "https://i.imgur.com/lmY5soG.gif",
    "https://i.imgur.com/IgGumrf.gif",
    "https://i.imgur.com/KKAMPju.gif"
];

var rand = list[client.Random.int(0, list.length)];
let user = message.mentions.users.first() || client.users.cache.get(args[0]);
if (!user) {
return message.reply('lembre-se de mencionar um usuário válido para beijar!');
}
/*
message.channel.send(`${message.author.username} **acaba de beijar** ${user.username}! :heart:`, {files: [rand]});
*/
let avatar = message.author.displayAvatarURL({format: 'png', dynamic: true });
if (user === client.user) {
	let embed = new MessageEmbed()
	.setTitle('E-Espera!')
	.setImage(rand)
	.setDescription(`${message.author} m-me beijou...`)
	.setColor(client.colors[0].hex)
	.setTimestamp()
	.setThumbnail(avatar)
	.setFooter('E-Eu tô ficando ve-vermelha......')
	.setAuthor(message.author.tag, avatar);

	
  await message.channel.send(embed);
	} else {
		let embed = new MessageEmbed()
		.setTitle('Owwwn, se beijaram!')
    .setColor('RANDOM')
    .setDescription(`${message.author} beijou ${user}`)
    .setImage(rand)
    .setTimestamp()
    .setThumbnail(avatar)
    .setFooter('Omae Wa Mou.... Apaixonante!')
    .setAuthor(message.author.tag, avatar);

		
  await message.channel.send(embed);
	}
}

module.exports.help = {
	"name": "kiss",
	"altNames": [
		"beijar"
	],
	"category": ["Diversão", "Fun"]
}