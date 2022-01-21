module.exports = {
    name: "mesaj",
    description: "Bot Adına Mesaj Gönderir.",
    category: "Yetkili",
    cooldown: 5,
    guildOnly: true,
    permission: "MANAGE_MESSAGES",
    execute(message, args, Embed, Discord) {

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(Embed("","Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın."));

        const channel = message.mentions.channels.first();
        if (!channel) return message.channel.send(Embed("", "Lütfen Bir Kanal Etiketle.", "info"))

        const text = args.splice(1, args.length - 1).join(" ");
        if (!text) return message.channel.send(Embed("", "Lütfen Bir Mesaj Yaz!", "info"))

        const infoEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(text)
            .setFooter(`${message.member.user.username}#${message.member.user.discriminator}`, message.member.user.avatarURL({ dynamic: true, format: 'png', size: 256 }))


        channel.send(infoEmbed).then(msg => {
            message.delete();
        })
    }
}