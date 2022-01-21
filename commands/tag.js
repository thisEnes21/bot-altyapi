module.exports = {
    name: "tag",
    description: "Kişinin Etiketini Değiştirir.",
    category: "Yetkili",
    cooldown: 5,
    guildOnly: true,
    permission: "MANAGE_NICKNAMES",
    execute(message, args, Embed, Discord) {

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(Embed("","Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın."));

        const mentionedPlayer = message.mentions.members.first()

        if (!mentionedPlayer) return message.channel.send(Embed("", "Lütfen Bir Kullanıcıyı Etiketle.", "info"))

        const newNickname = args.splice(1, args.length - 1).join(" ")

        mentionedPlayer.setNickname(newNickname).then(() => {
            return message.channel.send(Embed("", `${mentionedPlayer.displayName} Adlı Kişinin Etiketi Başarıyla ${newNickname} olarak Değiştirildi.`))
        }).catch(() => {
            return message.channel.send(Embed("", "Yetkin Yok", "error"))
        })

    }
}