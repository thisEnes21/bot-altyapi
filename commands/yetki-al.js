const Discord = require("discord.js")

module.exports = {
    name: "yetki-al",
    category: "Yetkili",
    description: "Etiketlediğiniz kullanıcıdan rol alır.",
    guildOnly: true,
    permission: "ADMINISTRATOR",
    aliases: ["yetkial", "yal", ""],
    execute(message, client, args) {

        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Bir Kişi Etiketle")
        let rol = message.mentions.roles.first()
        if (!rol) return message.channel.send("Rol Etiketle")
        member.roles.remove(rol)

        const embed = new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription(`${member} Adlı Kullanıcıdan ${rol} Rolü Alındı`)
        message.channel.send(embed)
    }
}