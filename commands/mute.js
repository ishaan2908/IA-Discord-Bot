const discord = require('discord.js');
exports.run = (client, message, args) => {
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    let modlog = client.channels.cache.find(r => r.name === 'mod-log');
    let muteRole = client.guilds.cache.get(message.guild.id).roles.cache.find(r => r.name === 'muted');
    if(!modlog) return message.reply('I cannot find a mod-log channel').catch(console.error);
    if(!muteRole) return message.reply('I cannot find a mute role').catch(console.error);
    if(message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').catch(console.error);
    if(reason.length < 1) return message.reply('You must supply a reason for the mute.').catch(console.error);
    
    const embed = new discord.MessageEmbed()
        .setColor(0x00AE86)
        .setTimestamp()
        .addField('Action:', 'Un/Mute')
        .addField('User:', `${user.username}#${user.discriminator}`)
        .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`);

    if(!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('You do not have the correct permissions for this!').catch(console.error);

    // For assigning/ removing muted role.
    if(message.guild.member(user).roles.cache.some(r => r.name === 'muted')) {
        message.guild.member(user).roles.remove(muteRole).then(() => {
            client.channels.cache.get(modlog.id ).send({embed}).catch(console.error);
        });
    } else {
        message.guild.member(user).roles.add(muteRole).then(() => {
            client.channels.cache.get(modlog.id).send({embed}).catch(console.error);
        })
    }

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'mute',
    description: 'Use once to Mute a user, and then use same command again to UnMute.',
    usage: ' !mute [username] [reason]'
};