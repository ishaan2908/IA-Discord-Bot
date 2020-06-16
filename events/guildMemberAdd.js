module.exports = member => {
	member.guild.channels.cache.find(channel => channel.name === "general").send(`Please welcome ${member.user.username} to the server!`);
};