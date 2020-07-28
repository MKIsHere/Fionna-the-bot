module.exports.run = async (client, message, args) => {
	let user = message.author;
	let maxMoneyPerWork = client.currencyConfig.work.maxMoneyPerWork || 55555;
	let cooldown = 3.6e+6 || 1.08e+7;
	
	let work = client.currency.work(user.id, client.Random.int(1, maxMoneyPerWork), {jobs: ["Youtuber", "Streamer", "Detetive", "Ator Pornô", "Ator", "Cantor(a)", "Ajudante de Obra", "Lenhador(a)", "Cozinheiro(a)"], cooldown: cooldown})
	let workHours = work.time.hours;
	if (work.time.hours <= 9) {
		workHours = "0" + work.time.hours;
	} else {
		workHours = work.time.hours;
	}
	let workMinutes = work.time.minutes;
	if (work.time.minutes <= 9) {
		workMinutes = "0" + work.time.minutes;
	} else {
		workMinutes = work.time.minutes;
	}
	let workSeconds = work.time.seconds;
	if (work.time.seconds <= 9) {
		workSeconds = "0" + work.time.seconds;
	} else {
		workSeconds = work.time.seconds;
	}


	let workTime = `${workHours}:${workMinutes}:${workSeconds}`;
	let brackets = [
		`${client.dep.chalk.keyword("orange")("[")}`,
		`${client.dep.chalk.keyword("orange")("]")}`
	];
	if (work.onCooldown) {


		console.log(`${brackets[0]}${client.dep.chalk.green(message.guild.name)}: ${client.dep.chalk.keyword("cyan")(message.channel.name)}${brackets[1]} ${client.dep.chalk.keyword("purple")(user.username)}: Faltam ${client.dep.chalk.keyword("pink")(workTime)} para trabalhar novamente`);
		return message.channel.send(`Você já trabalhou, espere ${workTime} segundos para trabalhar novamente.`);
	} else {
		try {
			return message.channel.send(`Você trabalhou como ${work.workedAs} e ganhou **${client.currencyConfig.currency.simbolo}${work.amount}**!`);
		} catch (err) {
			return console.error(client.dep.chalk.red("[COMMANDS]") + `Erro: ${err} ao executar ${client.dep.chalk.red("work")}`);
		}
	}
};

module.exports.help = {
	"name": "work",
	"altNames": ["trabalhar"],
	"category": ["Economia", "Economy"]
};