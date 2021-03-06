const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
		let language = client.db.fetch(`${message.guild.id}.language`) || 0;
    let data = client.db.all().filter(i => i.ID.startsWith("_xp")).sort((a, b) => b.data - a.data);
    if (data.length < 1) return message.channel.send("Leaderboard indisponível");
    let myrank = data.map(m => m.ID).indexOf(`${message.author.id}.status._xp`) + 1 || "N/A";
    data.length = 20;
    let lb = [];
    for (let i in data)  {
        let id = data[i].ID.split("_")[1];
        let user = await client.users.fetch(id);
        user = user ? user.tag : "Irineu#0000";
        let rank = data.indexOf(data[i]) + 1;
        let level = client.db.get(`{id}.status.level`);
        let xp = data[i].data;
        let xpreq = Math.floor(Math.pow(level / 0.1, 2));
				let money = client.currency.fetchMoney(id);
        lb.push({
            user: { id, tag: user },
            rank,
            level,
            xp,
            xpreq
        });
    };

    const embed = new MessageEmbed()
    .setTitle("Leaderboard")
    .setColor("RANDOM")
    lb.forEach(d => {
        embed.addField(`${d.rank}. ${d.user.tag}`, `**Level** - ${d.level}\n**XP** - ${d.xp} / ${d.xpreq}`);
    });
    if (language === 0) {
			embed.setFooter(`Você está no RANK ${myrank}`);
		} else {
			embed.setFooter(`You are on RANK ${myrank}`);
		}
    return message.channel.send(embed);
};

module.exports.help = {
    name: "leaderboard"
};