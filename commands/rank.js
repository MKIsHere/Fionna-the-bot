const { MessageAttachment } = require("discord.js");

module.exports.run = async (client, message, args) => {
  let user =
    message.mentions.users.first() ||
    client.users.cache.get(args[0]) ||
    match(args.join(" ").toLowerCase(), message.guild) ||
    message.author;

  let level = client.db.get(`${user.id}.status.level`) || 0;
  level = level.toString();
  let exp = client.db.get(`${user.id}.status._xp`) || 0;
  let neededXP = Math.floor(Math.pow(level / 0.1, 2));

  let every = client.db
    .all()
    .filter(i => i.ID.endsWith("status._xp"))
    .sort((a, b) => b.data - a.data);
  let rank = every.map(x => x.ID).indexOf(`${user.id}.status._xp`) + 1;
  rank = rank.toString();
	let rankAvatarURL = user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }) || client.rankConfig.defaultRankAvatar;
  let img = await client.canvas.rank({
    username: user.username,
    discrim: user.discriminator,
    currentXP: exp.toString(),
    neededXP: neededXP.toString(),
    rank: rank,
    level: level,
		gradient: ["red", "blue", "green"],
		overlay: true,
		status: message.author.presence.status,
    avatarURL: rankAvatarURL,
    background: "https://cdn.jsdelivr.net/gh/MKIsHere/my-bff-bot/5000199-dark-blur-abstract-minimalism-hd-4k-artist-artwork-digital-art-deviantart.jpg"
  });
  if (!user.bot) {
		return message.channel.send(new MessageAttachment(img, "rank.gif"));
	} else {
		return message.channel.send("Sinto muito, porém Bots não têm RANK.");
	}
};

function match(msg, i) {
  if (!msg) return undefined;
  if (!i) return undefined;
  let user = i.members.cache.find(
    m =>
      m.user.username.toLowerCase().startsWith(msg) ||
      m.user.username.toLowerCase() === msg ||
      m.user.username.toLowerCase().includes(msg) ||
      m.displayName.toLowerCase().startsWith(msg) ||
      m.displayName.toLowerCase() === msg ||
      m.displayName.toLowerCase().includes(msg)
  );
  if (!user) return undefined;
  return user.user;
}

module.exports.help = {
  name: "rank"
};