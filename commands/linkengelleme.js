module.exports = {
    name: "linkengelleme",
    cooldown: 5,
    permisson: "ADMINISTRATOR",
    category: "Güvenlik",
    description: "Kullanıcıların link göndermesini engeller.",
    guildOnly: true,
    aliases: ["link-engelleme", "linkengel", "lengel"],
    async execute(message, args, Embed, Discord, Tags, tag) {

        const prefix = tag.get("prefix");

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(Embed("","Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın."));
        
        if (args[0] == "aktif") {

            await Tags.update({ link_protect_enabled: true }, { where: { guild_id: message.guild.id } })
            return message.channel.send(Embed("", "Link Engelleme Sistemi Başarıyla Aktifleştirildi."))
        }
        else if (args[0] == "pasif") {

            await Tags.update({ link_protect_enabled: false }, { where: { guild_id: message.guild.id } })
            return message.channel.send(Embed("", "Link Engelleme Sistemi Başarıyla Pasifleştirildi."))
        }
        else {

            const infoEmbed = new Discord.MessageEmbed()
                .setTitle("Link Engelleme Sistemi")
                .setColor("RANDOM")
                .setDescription("═══════════◥◣❖◢◤════════════\n\u200bKullanıcıların bu komutu kullanarak link göndermesini engelleyebilirsiniz.\n\u200b═══════════◥◣❖◢◤════════════\n\u200b")
                .addFields(
                    { name: `${prefix}linkengelleme aktif`, value: "Link Engelleme Sistemini aktifleştirir." },
                    { name: `${prefix}linkengelleme pasif`, value: "Link Engelleme Sisteminiz Pasifleştirir." },
                )

            message.channel.send(infoEmbed);
        }

    }
}
