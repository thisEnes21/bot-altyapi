module.exports = {
    name: "ban",
    description: "Kişiyi Banlar.",
    category: "Yetkili",
    guildOnly: true,
    permission: "BAN_MEMBERS",
    execute(message, client, args) {
        const mentionedPlayer = message.mentions.members.first()

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(("", "Bu komutu kullanabilmek için **Üyeleri Yasakla** iznine sahip olmalısın."));
        if (!mentionedPlayer) return message.channel.send(("", "Lütfen Bir Kullanıcıyı Etiketle!" ));

        message.guild.members.ban(mentionedPlayer)
            .then(() => {
                message.channel.send(Embed("", `${mentionedPlayer.displayName} Sunucudan Banlandı!`))
            })
            .catch(() => {
                message.channel.send("", `${mentionedPlayer.displayName} Adlı Kişinin Yetkisi Benden Daha Yüksek Olduğu İçin Bu Kişiyi Banlayamıyorum!` )
            })
    }
}