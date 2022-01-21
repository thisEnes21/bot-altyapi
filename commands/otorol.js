module.exports = {
    name: "otorol",
    description: "Sunucuya Katılan Üyelere Otomatik Olarak Belirttiğiniz Rol Verir.",
    cooldown: 3,
    guildOnly: true,
    permission: "ADMINISTRATOR",
    category: "Bot",
    async execute(message, args, Embed, Discord, Tags, tag) {

        const data = tag.get("auto_role");
        const bot = message.guild.members.cache.get(message.client.user.id);
        const prefix = tag.get("prefix");

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(Embed("","Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın."));
        
        if (args[0] == "aktif") {

            const role = message.guild.roles.cache.get(data.role_id);
            if (!role) return message.channel.send(Embed("", `Lütfen otomatik rolü aktifleştirmeden önce \`${prefix}otorol rol @rol\` Komutunu Kullanarak Otomatik Rolü Belirleyiniz.`, "info"))

            bot.roles.add(role)
                .then(async () => {
                    bot.roles.remove(role)

                    data.enabled = true,
                        await Tags.update({ auto_role: data }, { where: { guild_id: message.guild.id } })
                    return message.channel.send(Embed("", "Otomatik Rol Başarıyla Aktifleştirildi."));
                })
                .catch (() => {
                    return message.channel.send(Embed("", "Belirtilen Rol, Yetkimin Üzerinde olduğu veya Rol Silindiği için otomatik olarak rol kaydedilemiyor."))
                })

        }
        else if (args[0] == "pasif") {

            data.enabled = false,
                await Tags.update({ auto_role: data }, { where: { guild_id: message.guild.id } })
            return message.channel.send(Embed("", "Otomatik Rol Başarıyla Pasifleştirildi."));


        }
        else if (args[0] == "rol") {

            const mentionedRole = message.mentions.roles.first();
            if (!mentionedRole) return message.channel.send(Embed("", "Lütfen bir rol etiketleyiniz.", "info"))

            message.member.roles.add(mentionedRole)
                .then(async () => {
                    message.member.roles.remove(mentionedRole);
                    data.role_id = mentionedRole.id;

                    await Tags.update({ auto_role: data }, { where: { guild_id: message.guild.id } })
                    return message.channel.send(Embed("", `Otomatik Verilecek Rol ${mentionedRole} Olarak Ayarlandı.`))
                })
                .catch(() => {
                    return message.channel.send(Embed("", "Belirtilen Rol, Yetkimin Üzerinde olduğu veya Rol Silindiği için otomatik olarak rol kaydedilemiyor.", "error"))
                })

        }
        else {

        }

    }
}

// !otorol aktif
// !otorol pasif
// !otorol rol <rol>
