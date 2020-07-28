module.exports.run = async (client, message, args) => {
	let language = client.db.fetch(`${message.guild.id}.language`) || 0;

	


	 let add = client.currency.daily(message.author.id, client.currencyConfig.dailyAmount);
	 let money = client.currency.fetchMoney(message.author.id);
	 if (language === 0) {
		 if (add.onCooldown) {
		 return message.channel.send(`Você já claimou seus ${client.currencyConfig.currency.name} diários. Volte em ${add.time.days} dias, ${add.time.hours} horas, ${add.time.minutes} minutos e ${add.time.seconds} segundos.`);
		 } else {
			 try {
				 await console.log(client.dep.chalk.keyword("yellow")("[COMMANDS]") + `${message.author.username} claimou seus ${client.currencyConfig.currency.name} diários (${add.amount}) em ${message.guild.name}`);
				 return message.channel.send(`Opaa! Você claimou seus ${client.currencyConfig.currency.simbolo}${add.amount}. Agora você têm **${client.currencyConfig.currency.simbolo}${money.balance}** na sua Carteira.`);
			 } catch (err) {
				 await message.channel.send("Um  erro ocorreu, tente novamente.");
				 return console.error(client.dep.chalk.red("[COMMANDS]") + err);
			 }
			 }
	 } else {
		 if (add.onCooldown) {
		 return message.channel.send(`You've already claimed your daily ${client.currencyConfig.currency.name}. Come back later in ${add.time.days} days, ${add.time.hours} hours, ${add.time.minutes} minutes e ${add.time.seconds} seconds.`);
		 } else {
			 try {
				 await console.log(client.dep.chalk.keyword("yellow")("[COMMANDS]") + `${message.author.username} claimou seus ${client.currencyConfig.currency.name} diários (${add.amount}) em ${message.guild.name}`);
				 return message.channel.send(`Howdy! You claimed your daily ${client.currencyConfig.currency.simbolo}${add.amount}. You now have **${client.currencyConfig.currency.simbolo}${money.balance}** in your Wallet.`);
			 } catch (err) {
				 await message.channel.send("An error has occurred, please try again.");
				 return console.error(client.dep.chalk.red("[COMMANDS]") + err);
			 }
			 }
	 }
};

module.exports.help = {
	"name": "daily",
	"category": [
		"Economia",
		"Economy"
	]
}