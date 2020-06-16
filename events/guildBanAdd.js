module.exports = (guild, user) => {
	guild.channels.cache.find(channel => channel.name === "general").send(`${user.username} was Banned!`);
};