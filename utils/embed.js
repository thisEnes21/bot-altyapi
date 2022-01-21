const Discord = require('discord.js');

module.exports = (title, description, color = "RANDOM") => {
    const Embed = new Discord.MessageEmbed()
        .setTitle(title)
        .setDescription(description)
        .setColor(color)

    return Embed;
}