const Discord = require("discord.js")

module.exports = {
    name: "yetki-ver",
    description: "Etiketlediğiniz kullanıcıya rol verir.",
    category: "Yetkili",
    guildOnly: true,
    permission: "ADMINISTRATOR",
    aliases: ["yetkiver", "yver", "yetkiv"],
    execute(message, client, args) {

    let member = message.mentions.members.first()
    if (!member) return message.channel.send("Bir Kişi Etiketle")
    let rol = message.mentions.roles.first()
    if (!rol) return message.channel.send("Rol Etiketle")
    member.roles.add(rol)

    const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(`${member} Adlı Kullanıcıya ${rol} Rolü Verildi`)
    message.channel.send(embed)
}
}