module.exports = {
    name: "genel",
    cooldown: 5,
    guildOnly: true,
    execute(message, args, Embed, Discord, Tags, tag) {

        const infoEmbed = new Discord.MessageEmbed()
            .setTitle("💬 Genel Komutlar")
            .setDescription("╔═══════════◥◣❖◢◤════════════╗")
            .setColor("RANDOM")

        message.client.commands.forEach(command => {
            if(command.category == "Genel"){
                infoEmbed.addField(`${tag.get("prefix")}${command.name}`, command.description);
            }
        })

        return message.channel.send(infoEmbed);
    }
}