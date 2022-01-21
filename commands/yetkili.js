module.exports = {
    name: "yetkili",
    cooldown: 5,
    guildOnly: true,
    execute(message, args, Embed, Discord, Tags, tag) {

        const prefix = tag.get("prefix");

        const infoEmbed = new Discord.MessageEmbed()
            .setTitle(":no_entry_sign: Yetkili Komutları")
            .setColor("RANDOM")

        message.client.commands.forEach(command => {
            if(command.category == "Yetkili"){
                infoEmbed.addField(`${prefix}${command.name}`, command.description);
            }
        })

        return message.channel.send(infoEmbed);
    }
}