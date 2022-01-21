module.exports = {
    name: "kick",
    description: "Kişiyi Sunucudan Atar",
    category: "Yetkili",
    guildOnly: true,
    permission: "KICK_MEMBERS",
    execute(message, args, Embed){
        const mentionedPlayer = message.mentions.members.first()
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(Embed("","Bu komutu kullanabilmek için **Üyeleri At** iznine sahip olmalısın."));
        if(!mentionedPlayer) return message.channel.send(Embed("", "Lütfen Bir Kullanıcıyı Etiketle!", "info"));

        mentionedPlayer.kick()
        .then(member => {
            message.channel.send(Embed("", `${mentionedPlayer.displayName} Sunucudan Atıldı!`))
        })
        .catch(() => {
            message.channel.send(Embed("", `${mentionedPlayer.displayName} Adlı Kişinin Yetkisi Benden Daha Yüksek Olduğu İçin Bu Kişiyi Kickleyemiyorum!`, "error"))
        })
    }
}