module.exports = member => {
	member.guild.channels.cache.find(channel => channel.name === "general").send(`Goodbye ${member.user.username}`);
};