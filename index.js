const Discord = require("discord.js");
const client = new Discord.Client();
const Canvacord = require("canvacord");
const fs = require("fs");

const Eco = require("quick.eco");
client.currency = new Eco.Manager();
client.currencyConfig = {
	"currency":{
		"name": "Euros",
		"simbolo": "€"
	},
	"dailyAmount": 250,
	"work": {
		"maxMoneyPerWork": 15000,
		"cooldown": 1.08e+7
	}
}
client.colors = [
	{name: "PRINCIPAL", hex: "6096BA"},
	{name: "SECONDARY", hex: "37515F"}
]
client.Random = require('random');
client.db = require("quick.db");
client.canvas = new Canvacord();
client.commands = new Discord.Collection();
client.cooldown = new Discord.Collection();
client.config = {
  TOKEN: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  prefix: "_",
  cooldown: 15000,
	version: "2020.0.0.00.00"
};

packageJSON = require("./package.json");

client.config.version = packageJSON.version;

client.proudGifs = [
	"https://tenor.com/view/iam-so-proud-of-you-so-proud-of-you-gif-13026385",
	"https://tenor.com/view/proud-yes-getit-girl-celebrate-gif-4408173",
	"https://tenor.com/view/clapping-applause-well-done-good-gif-5719761",
	"https://tenor.com/view/michael-scott-the-office-sad-face-broken-heart-gif-11734371"
];

client.rankConfig = {
	defaultRankAvatar: 'https://cdn.jsdelivr.net/gh/MKIsHere/my-bff-bot/724350793427189872.png'
}

client.config.TOKEN = process.env.TOKEN;
client.langs = [
	"Português (Brasil)",
	"English"
];
// Load Commands
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(f => {
    if (!f.endsWith(".js")) return;
    let command = require(`./commands/${f}`);
    client.commands.set(command.help.name, command);
    if (command.help.altNames) {
			command.help.altNames.forEach(name => {
				client.commands.set(name, command);
			});
		}
  });
});

// Events
client.once("ready", () => {
  console.log("Tô acordada, tô acordada! Xô só pegar café...");

	client.user.setPresence({ activity: { name: 'Pera gente, tô pegando café', type: 'PLAYING' }});

	
});

client.presences = {
	"array": [],
	"length": 0
}
client.presences.array = [
		"Sou lésbica de carteirinha, isso aí, Dattebayo!",
		"Uuuuui, a Senhorita Milena parece ser bem totosa ein..... Meu sentido lésbico tá pirando aqui",
		"A Mamãe disse que eu sou uma ótima Lésbica, quem aí também acha isso?",
		"Hum.... prevejo um show lésbico essa semana..",
		"SOU LÉSBICA E COM ORGULHO, BELEZA?",
		"Olha... a Mamãe disse que eu deveria fazer amigos.. quer ser meu amigo?",
		"Loritta-Senpai... será que um dia me notará?",
		`Estou na versão ${client.config.version}`
];
client.presences.array.forEach(pr => {
	client.presences.length += 1;
});

client.db.set(`currencyConfig`, client.currencyConfig);

client.setTimeout(() => {
	client.user.setPresence({ activity: { name: client.presences.array[client.Random.int(0, client.presences.length)], type: 'PLAYING' }});
	console.log("Tô pronta!");
}, 5000);

client.setInterval(() => {
	try {
		client.user.setPresence({ activity: { name: client.presences.array[client.Random.int(0, client.presences.length)], type: 'PLAYING' }});
	} catch (err) {
		console.log(client.dep.chalk.red("Erro: " + err));
	}
}, 15000);

client.on("error", console.error);

client.on("warn", console.warn);

var oppaiImages = [
	"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRiXaZkvqcqqMb3ZOusPL92HHQx1D1FzJLpMg&usqp=CAU",
	"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRutV7fmz98O4Y_nbGmap76Su_EI_gHDxkl6w&usqp=CAU",
	"data:image/jpeg;base64,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"
]

client.dep = {
	"chalk": require('chalk')
};

let language =  0;



let rainbowCount = 0;
client.on("message", async (message) => {
	let nonCmdChannels = client.db.fetch(`${message.guild.id}.disabledChannels`) || [
		{name: 'sugestões', id: '738113559875027075'}
	];
	let nonCmdChannels_ids = nonCmdChannels.map(channel => {
		return channel["id"];
	});
  if (!message.guild) return;
	let prefix = client.db.fetch(`${message.guild.id}.prefix`) || client.config.prefix;
	if (message.content.includes("rainbow") || message.content.includes("arco-íris")) {
		rainbowCount += 1;
		let rainbow = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setImage("https://media.discordapp.net/attachments/736293662585126922/737703082674225172/dance3.gif")
		.setDescription("Viva!!!");

		if (rainbowCount >= 5) {
			return message.channel.send("EU NÃO VOU DAR ARCO-ÍRIS BUCETA :angry:");
			rainbowCount = 0;
		}

		return message.channel.send("Arco-íris nem são tão legais...");
		/*return message.channel.send(rainbow).then(embed => client.setInterval(() => {
			if (embed.embeds[0]) {
				rainbow.setColor('RANDOM');
				embed.edit(rainbow);
			}
		}, 1)); */
	}
	if (message.content.includes("welcome")) {
		let avatarURL = message.author.displayAvatarURL({format: 'png', dynamic: true, size: 1024}) || "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT9CnKrYhQHjpfcq35UNpspGqs3rTzmhuyeOQ&usqp=CAU";
		let img = await client.canvas.welcome({username: message.author.username, discrim: message.author.discriminator, avatarURL: avatarURL, color: "purple"});
	
		return await message.channel.send(new Discord.MessageAttachment(img, "welcome.png"));
	}
	if (message.content.includes("pixel")) {
		let avatarURL = message.author.displayAvatarURL({format: 'png', dynamic: true, size: 1024}) || "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT9CnKrYhQHjpfcq35UNpspGqs3rTzmhuyeOQ&usqp=CAU";
		let img = await client.canvas.pixelate(avatarURL, 10);

		return await message.channel.send(new Discord.MessageAttachment(img, "pixelate.gif"));
	}

	if (message.content.includes("Eu sou a Mestra da Horda!")) {
		message.member.roles.add(message.guild.roles.cache.get("737709073105158175"));
	} else if (message.content.includes("Pela honra de Grayskull") && message.author.id === "617843971049390100" || message.content.toLowerCase === "pela honra de grayskull" && message.author.id === "617843971049390100" || message.content.toLowerCase === "pela honra de grayskull!" && message.author.id === "617843971049390100") {
		if (!message.member.roles.cache.has("737773707266752514")) {
				message.member.roles.add(message.guild.roles.cache.get("737773707266752514"));
				return message.channel.send(`She-Ra! Que a força esteja contigo, ${message.author.toString()} https://tenor.com/view/she-ra-transform-sword-swing-power-sword-gif-17742518`);
	
		} else {
			message.member.roles.remove(message.guild.roles.cache.get("737773707266752514"));
			return message.channel.send(`Vai pegar a Felina, vai, ${message.author.toString()} https://tenor.com/view/she-ra-transform-sword-swing-power-sword-gif-17742518`);
		}
	} else if (message.content.includes("Pelos poderes de Grayskull") && message.author.id === "371084632046829568" || message.content.includes("Eu tenho a Força") && message.author.id === "371084632046829568" || message.content.toLowerCase() === "eu tenho a força!" && message.author.id === "371084632046829568" || message.content.toLowerCase() === "eu tenho a força" && message.author.id === "371084632046829568") {
		if (!message.member.roles.cache.has("737773981314318378")) {
			message.member.roles.add(message.guild.roles.cache.get("737773981314318378"));
			return message.channel.send(`Você acaba de se transformar, ${message.author.toString()}! https://tenor.com/view/he-man-sword-lightning-gif-8127394`);
		} else {
			message.member.roles.remove(message.guild.roles.cache.get("737773981314318378"));
			return message.channel.send(`Cuidado com o esqueleto, ${message.author.toString()}! https://tenor.com/view/he-man-sword-lightning-gif-8127394`);
		}
	}
	if (message.content.includes("spam")) {
		try {
			if (!message.author.bot) {
				await message.channel.send(`! @everyone Uuuuuuuui, sentei no pau grandiii \n\n spam`);
			} else {
				await message.channel.send(`Algué- Não, não curto isso.`);
			}
		} catch (err) {
			console.error(client.dep.chalk.red("Erro: ") + err);
		}
	} else if (message.content.includes("Opa")) {
		if (!message.author.bot) {
			message.channel.send("Oppai Oppai Oppai!");
		}
	} else if (message.content.includes("Oppai")) {
		if (!message.author.bot) {
			message.channel.send("Você disse.... OPPAI???");
			message.channel.send(oppaiImages[client.Random.int(0,oppaiImages.length)]);
		}
	} else if (message.content.includes("marca geral")) {
		message.channel.send("Marcando geral....").then(msg => msg.channel.send("@everyone marquei geral.. OLOKO KKK"));
	}

	client.proudGifs.forEach(t => {
		if (message.content.includes(t)) {
		if (message.author.id === "735175624242757683") {
			message.channel.send(`${message.author.toString()}, obrigada ${message.author.username}-Senpai!`);
		}
	}
	})



	language = client.db.fetch(`${message.guild.id}.language`) || 0;
  // Handle XP
  if (!message.author.bot) {
		if (!nonCmdChannels_ids.includes(message.channel.id)) {
			xp(message);
  // command handler
  if (!message.content.startsWith(prefix)) return;
  let args = message.content.slice(prefix.length).trim().split(" ");
  let command = args.shift().toLowerCase();
  let commandFile = client.commands.get(command);
  if (!commandFile) return;
  commandFile.run(client, message, args);
		} else {
			if (!message.content.startsWith(prefix)) return;
			message.reply("Sinto muito, me impediram de usar comandos nesse canal.").then(msg => client.setTimeout(() => {msg.delete()}, 2000));
		}
	}
});

var canXpChannels = [
	"735615778484650026",
	"735177278585307253"
]
var doubleXpChannels = [
	"735615751528120411"
]

var perMessageXp = client.Random.int(min = 1, max = 8);

client.setInterval(() => {
	perMessageXp = client.Random.int(min = 1, max = 8);
}, 1000 * 60);

client.logs = {"addLog": null, "channel": null, "logEnabled": true, "brackets": [
	`${client.dep.chalk.keyword("orange")("[")}`,
	`${client.dep.chalk.keyword("orange")("]")}`
]};
let makeLog = async (content, author, logChannel) => {
	if (!isNaN(client.db.fetch(`${logChannel.guild.id}.logs.color`))) {
		client.db.set(`${logChannel.guild.id}.logs.color`, client.colors[0].hex);
	}
	if (!client.db.fetch(`${logChannel.guild.id}.logs.colorDefined`)) {
		client.db.set(`${logChannel.guild.id}.logs.color`, client.colors[0].hex);
		client.db.set(`${logChannel.guild.id}.logs.colorDefined`, true);
		console.log(`Cor do Log de ${logChannel.guild.name} (${logChannel.guild.id}) foi definido para ${client.db.fetch(`${logChannel.guild.id}.logs.color`)}`);
	}
	let embed = new Discord.MessageEmbed()
	.setAuthor(`${author.username}#${author.discriminator}`, author.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))
	.setColor(client.db.fetch(`${logChannel.guild.id}.logs.color`))
	.setDescription(content)
	.setTimestamp();


	if (logChannel != false || logChannel != null) {
		try {
			
		const webhooks = await logChannel.fetchWebhooks();
		const webhook = webhooks.first();
		if (!webhook) {
			logChannel.createWebhook(`LOGS - ${logChannel.guild.name}`, {
				avatar: 'https://i.imgur.com/wSTFkRM.png'
			}).then(web => console.log('[WEBHOOKS]' + `Webhook ${web.name} acaba de ser criado no ${logChannel.name} (${logChannel.guild.name})`));
		}
		
		webhook.send(' ', {
			username: `LOGS - ${logChannel.guild.name}`,
			avatarURL: 'https://i.imgur.com/wSTFkRM.png',
			embeds: [embed],
		});
		} catch (err) {
			console.error(client.dep.chalk.red("[LOGS]") + `Error: ${err}`);
		}
	} else {
		console.log(client.dep.chalk.keyword("Yellow")(`[LOGS: ${author}]`) + content);
	}
}

client.logs.addLog = makeLog;

function consoleLog(logContent, message) {
	let channel = message.guild.channels.cache.get('735902007440965673');

	channel.send(actualContent);
}

client.channelsObj = {
	"reply": function(content, message) {
		return message.channel.send(message.author.toString() + ", " + content);
	},
	"search": function(value) {
		let actualValue = value.toLowerCase();
		if (actualValue === "logs") {
			return client.channels.cache.get('735622491225063486'); 
			} else if (actualValue === "colors" || value === "cores") {
				return client.channels.cache.get('736314185935355915');		
			} else {
			return console.error("Erro: Impossível encontrar o canal");
		}
	}
}

function xp(message) {
  canXpChannels.forEach(nxpc => {
		if (message.channel.id === nxpc) {
			if (!client.cooldown.has(`${message.author.id}`) || !(Date.now() - client.cooldown.get(`${message.author.id}`) > client.config.cooldown)) {
    let xp = client.db.add(`xp_${message.author.id}`, perMessageXp);
    let level = Math.floor(0.3 * Math.sqrt(xp));
    let lvl = client.db.get(`level_${message.author.id}`) || client.db.set(`level_${message.author.id}`, 1);;
    if (level > lvl) {
      let newLevel = client.db.set(`level_${message.author.id}`, level);
      if (language === 0) {
				message.channel.send(`:tada: ${message.author.toString()}, você passou pro nível ${newLevel}!`);
			} else {
				message.channel.send(`:tada: ${message.author.toString()} Congratulations! You are now at the ${newLevel} level`);
			}
			console.log(`${client.dep.chalk.keyword("orange")("[")}${client.dep.chalk.green(message.guild.name)}${client.dep.chalk.keyword("orange")("]")} ${client.dep.chalk.keyword("purple")(message.author.username)}: Passou pro nível ${newLevel}.`);
		client.logs.addLog(`Passou pro nível ${newLevel}! Parabéns!`, message.author, message.guild.channels.cache.get('735622491225063486'));
    }
    client.cooldown.set(`${message.author.id}`, Date.now());
		console.log(`${client.dep.chalk.keyword("orange")("[")}${client.dep.chalk.green(message.guild.name)}: ${client.dep.chalk.keyword("cyan")("#" + message.channel.name)}${client.dep.chalk.keyword("orange")("]")} ${client.dep.chalk.keyword("purple")(message.author.username)}: Ganhou ${perMessageXp} de XP.`);
  }}});
	doubleXpChannels.forEach(dxpc => {
		if (message.channel.id === dxpc) {
			if (!client.cooldown.has(`${message.author.id}`) || !(Date.now() - client.cooldown.get(`${message.author.id}`) > client.config.cooldown)) {
    let xp = client.db.add(`xp_${message.author.id}`, perMessageXp * 2);
    let level = Math.floor(0.3 * Math.sqrt(xp));
    let lvl = client.db.get(`level_${message.author.id}`) || client.db.set(`level_${message.author.id}`, 1);;
    if (level > lvl) {
      let newLevel = client.db.set(`level_${message.author.id}`, level);
      message.channel.send(`:tada: ${message.author.toString()}, você passou pro nível ${newLevel}!`);
		client.logs.addLog(`Passou pro nível ${newLevel}! Parabéns!`, message.author, message.guild.channels.cache.get('735622491225063486'));
    }
    client.cooldown.set(`${message.author.id}`, Date.now());
		console.log(`${client.dep.chalk.keyword("orange")("[")}${client.dep.chalk.green(message.guild.name)}: ${client.dep.chalk.keyword("cyan")("#" + message.channel.name)}${client.dep.chalk.keyword("orange")("]")} ${client.dep.chalk.keyword("purple")(message.author.username)}: Ganhou ${perMessageXp * 2} de XP. (DOUBLE XP)`);
		}}});
};

let languageLoadingText = `Linguagem ${client.langs[language]} foi carregada.`;
let languageLoadedText = `Linguagem "${client.langs[language]}" carregada.`;
if (language === 0) {
	languageLoadingText = `Linguagem "${client.langs[language]}" sendo carregada.`;
	languageLoadedText = `Linguagem "${client.langs[language]}" carregada.`;
} else {
	languageLoadingText = `Loading "${client.langs[language]}" language.`;
	languageLoadedText = `"${client.langs[language]}" language loaded.`;
}
console.log(client.dep.chalk.keyword("yellow")("[LANGUAGE]") + ` ${languageLoadingText}`);
setTimeout(() => {
	console.log(client.dep.chalk.keyword("yellow")("[LANGUAGE]") + ` ${languageLoadedText}`);
}, 4900);

client.on("messageDelete", async(message) => {
	let canLog = client.db.fetch(`${message.guild.id}.logs.enabled`) || true;
	const logChannel = client.channelsObj.search("logs");
	let embed = new Discord.MessageEmbed()
	.setTimestamp()
	.setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024}))
	.setTitle(`Mensagem deletada em #${message.channel.name}`)
	.setDescription(`${message.content}`)
	.setColor(client.colors[0].hex);

	if (canLog) {
		if (!message.author.bot) {
		try {
		const webhooks = await logChannel.fetchWebhooks();
		const webhook = webhooks.first();
		if (!webhook) {
			logChannel.createWebhook(`LOGS - ${logChannel.guild.name}`, {
				avatar: 'https://i.imgur.com/wSTFkRM.png'
			}).then(web => console.log('[WEBHOOKS]' + `Webhook ${web.name} acaba de ser criado no ${logChannel.name} (${logChannel.guild.name})`));
		}
		
		webhook.send(' ', {
			username: `LOGS - ${logChannel.guild.name}`,
			avatarURL: 'https://i.imgur.com/wSTFkRM.png',
			embeds: [embed],
		}).catch(console.error);
		} catch (err) {
			console.error(client.dep.chalk.red("[LOGS]") + `Error: ${err}`);
		}}
	} else {
		console.log(client.dep.chalk.keyword("yellow")(`[LOGS: MENSAGEM DELETADA EM ${message.channel.name} (${message.guild.name}) DE "${message.author.username}#${message.author.discriminator}"] `) + `${message.content}`);
	}
});


client.login(client.config.TOKEN);