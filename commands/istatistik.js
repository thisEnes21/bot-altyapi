async function statisticCreate(message, tag, Tags, Embed) {

    const { guild } = message;

    await guild.channels.create("|▬▬|İstatistikler|▬▬|", {
        type: "category", permissionOverwrites: [
            {
                "id": guild.roles.everyone,
                "deny": ["CONNECT"]
            }
        ]
    }).then(async ctg => {

        const membersCount = guild.memberCount;
        const onlineMembersCount = guild.members.cache.filter(member => member.presence.status == "online" || member.presence.status == "idle" || member.presence.status == "dnd").size

        const allMembersChannel = await guild.channels.create(`Toplam Üye • ${membersCount}`, { type: "voice" });
        const onlineMembersChannel = await guild.channels.create(`Online Üye • ${onlineMembersCount}`, { type: "voice" });
        const recordMembersChannel = await guild.channels.create(`Rekor  Üye • ${onlineMembersCount}`, { type: "voice" });

        allMembersChannel.setParent(ctg.id);
        onlineMembersChannel.setParent(ctg.id);
        recordMembersChannel.setParent(ctg.id);

        const data = tag.get("statistic_data");

        data.category_channel_id = ctg.id;
        data.all_members_channel_id = allMembersChannel.id;
        data.online_members_channel_id = onlineMembersChannel.id;
        data.record_members_channel_id = recordMembersChannel.id;
        data.record_online = onlineMembersCount

        await Tags.update({ statistic_enabled: true }, { where: { guild_id: guild.id } });
        await Tags.update({ statistic_data: data }, { where: { guild_id: guild.id } });

        return message.channel.send(Embed("", "İstatistik kanalları başarıyla kuruldu."));

    })

}

async function statisticDelete(message, tag, Tags, Embed, type = "") {

    const { guild } = message;

    const data = tag.get("statistic_data");

    try { await guild.channels.cache.get(data.record_members_channel_id).delete() } catch { }
    try { await guild.channels.cache.get(data.all_members_channel_id).delete() } catch { }
    try { await guild.channels.cache.get(data.online_members_channel_id).delete() } catch { }
    try { await guild.channels.cache.get(data.category_channel_id).delete() } catch { }
    data.category_channel_id = "";
    data.all_members_channel_id = "";
    data.online_members_channel_id = "";
    data.record_members_channel_id = "";
    data.record_online = 0

    await Tags.update({ statistic_enabled: false }, { where: { guild_id: guild.id } });
    await Tags.update({ statistic_data: data }, { where: { guild_id: guild.id } });

    if (type) statisticCreate(message, tag, Tags, Embed);

    return message.channel.send(Embed("", "İstatistik kanalları başarıyla silindi."))
}

module.exports = {
    name: "istatistik",
    cooldown: 5,
    guildOnly: true,
    permission: "ADMINISTRATOR",
    description: "İstatistik kanallarını kurar.",
    category: "Bot",
    async execute(message, args, Embed, Discord, Tags, tag, emojis) {

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(Embed("","Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın."));
        
        if (args[0] == "kur") {

            if (!tag.get("statistic_enabled")) {

                statisticCreate(message, tag, Tags, Embed);
            } else {
                return message.channel.send(Embed("", "İstatistik sistemi zaten kurulu.", "error"))
            }
        }
        else if (args[0] == "sil") {

            if (tag.get("statistic_enabled")) {

                statisticDelete(message, tag, Tags, Embed);
            } else {
                return message.channel.send(Embed("", "İstatistik sistemi kurulu değil!", "error"))
            }
        }
        else if (args[0] == "yenile") {

            if (tag.get("statistic_enabled")) {

                statisticDelete(message, tag, Tags, Embed, "relaod");

            } else {
                return message.channel.send(Embed("", "İstatistik kanallarını yenileyebilmek için öncelikle aktifleştirmen gerek.", "info"))
            }
        }
        else {

            const infoEmbed = new Discord.MessageEmbed()
                .setTitle('📈 İstatistik')
                .setColor("RANDOM")
                .setDescription("═══════════◥◣❖◢◤════════════\n\u200bSunucudaki Ses Kanalına Bağlı Üye, Toplam Üye, Online Üye ve Rekor Online Sayısını takip edebileceğiniz istatistik kanallarını kurar. İstatistikler 2 dk sonra güncellenir. Çok fazla istek yollanması durumunda kısa süreliğine istatistik hataları alabilirsiniz.\n\u200b\n\u200bİstatistikler 5 dakikada bir kendi kendine yenilenir.\n\u200b═══════════◥◣❖◢◤════════════\n\u200b")
                .addFields(
                    { name: `Gereken Yetki:`, value: `Yönetici\n\u200b` },
                    { name: `${tag.get('prefix')}istatistik kur`, value: 'İstatistik Kanallarını Kurar.\n\u200b' },
                    { name: `${tag.get('prefix')}istatistik sil`, value: 'İstatistik Kanallarını Siler.\n\u200b' },
                    { name: `${tag.get('prefix')}istatistik yenile`, value: 'İstatistik Kanallarını Yeniler.\n\u200b' },
                )
            message.channel.send(infoEmbed);

        }

    }
}