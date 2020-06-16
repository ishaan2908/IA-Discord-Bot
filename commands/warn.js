const discord = require('discord.js');
exports.run = (client, message, args) => {
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    let modlog = client.channels.cache.find(r => r.name === 'mod-log');
    if (!modlog) return message.reply('I cannot find a mod-log channel');
    if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.').catch(console.error);
    if (reason.length < 1) return message.reply('You must supply a reason for the warning.');

    const embed = new discord.MessageEmbed()
        .setColor(0x00AE86)
        .setTimestamp()
        .addField('Action:', 'Warning')
        .addField('User:', `${user.username}#${user.discriminator}`)
        .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`);
    return client.channels.cache.get(modlog.id).send({embed});
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'warn',
    description: 'Issues a warning to the mentioned user in the mod-log channel.',
    usage: ' !warn [username] [reason]'
};