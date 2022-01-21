module.exports = {
    name: "bilgi",
    category: "Genel",
    cooldown: 5,
    guildOnly: true,
    description: "Etiketlenen kullanıcının bilgilerini gösterir.",
    execute(message, args, Embed, Discord, Tags, tag, emojis) {

        const member = message.mentions.members.first();
        if (!member) return message.channel.send(Embed("", "Lütfen bir kullanıcı etiketle.", "info"))

        const time = new Date(member.joinedTimestamp);
        const joinedDate = time.toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" });

        let lastMessage = "";
        if (lastMessage != null) {
            const messageLink = `https://discord.com/channels/${message.guild.id}/${member.lastMessageChannelID}/${member.lastMessageID}`
            lastMessage = `[:link: Tıkla](${messageLink})`
        }
        else{
            lastMessage = "Bulunamadı";
        }

        const infoEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setThumbnail(member.user.avatarURL())
            .addFields(
                { name: `Kişi:`, value: `${member.user.username}`, inline: true },
                { name: `Takma Ad:`, value: `${member.displayName}`, inline: true },
                { name: `Sunucuya Katılma Tarihi:`, value: `${joinedDate}\n\u200b`, inline: true },
                { name: `Son Mesajı:`, value: `${lastMessage}`, inline: true },
                { name: `Rol Sayısı:`, value: `${member.roles.cache.size - 1}`, inline: true },
                { name: `ID:`, value: `${member.id}`, inline: true },
            )

                message.channel.send(infoEmbed);

    }
}