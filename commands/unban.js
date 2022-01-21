module.exports = {
    name: "unban",
    description: "Kişinin Yasağını Kaldırır",
    category: "Yetkili",
    guildOnly: true,
    permission: "BAN_MEMBERS",
    execute(message, args, Embed) {
        const bannedPlayerID = args[0];

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(Embed("","Bu komutu kullanabilmek için **Üyeleri Yasakla** iznine sahip olmalısın."));

        if (!bannedPlayerID) return message.channel.send(Embed("", "Lütfen Bir Kullanıcının ID'sini Gir!", "info"));

        message.guild.members.unban(bannedPlayerID)
            .then(() => {
                return message.channel.send(Embed("", `Kişinin Banı Kaldırıldı.`))
            })
            .catch(() => {
                return message.channel.send(Embed("", "Bu ID'ye Sahip Kullanıcı Bulunamadı veya Bu Kullanıcı Yasaklı Değil!", "error"))
            })
    }
}