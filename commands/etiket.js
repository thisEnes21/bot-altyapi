module.exports = {
    name: "etiket",
    description: "Sunucuya Katılan Üyelerin Etiketini Düzenler.",
    cooldown: 3,
    permission: "ADMINISTRATOR",
    category: "Yetkili",
    aliases: ['nick'],
    async execute(message, args, Embed, Discord, Tags, tag) {

        const data = tag.get("tag");
        const prefix = tag.get("prefix");

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(Embed("","Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın."));
        
        if (args[0] == "aktif") {

            if (!data.tag_name) return message.channel.send(Embed("", "Lütfen Etiket Sistemini Aktifleştirmeden önce bir Etiket Ayarlayın.", "error"))

            data.enabled = true;
            await Tags.update({ tag: data }, { where: { guild_id: message.guild.id } });
            return message.channel.send(Embed("", "Etiket Sistemi Başarıyla Aktifleştirildi."))

        }
        else if (args[0] == "pasif") {

            data.enabled = false;
            await Tags.update({ tag: data }, { where: { guild_id: message.guild.id } });
            return message.channel.send(Embed("", "Etiket Sistemi Başarıyla Pasifleştirildi."))

        }
        else if (args[0]) {

            const text = args.join(" ")

            data.tag_name = text
            await Tags.update({ tag: data }, { where: { guild_id: message.guild.id } });
            return message.channel.send(Embed("", `Etiket Sistemi Başarıyla **${text.replace("%kullanıcı%", message.member.displayName)}** Olarak Ayarlandı`))

        }
        else {

            let isEnabled = false;
            if (data.enabled) isEnabled = "Aktif"
            else isEnabled = "Pasif"

            const infoEmbed = new Discord.MessageEmbed()
                .setTitle("Etiket Sistemi")
                .setColor("RANDOM")
                .setDescription("═══════════◥◣❖◢◤════════════\n\u200bBu Komutu Kullanarak Sunucunuza Yeni Katılan Üyelerin Nicklerini Düzenleyebilirsin.\n\u200b═══════════◥◣❖◢◤════════════\n\u200b ")
                .addFields(
                    { name: `Gereken Yetki:`, value: "Yönetici", inline: true },
                    { name: `Aktiflik Durumu:`, value: `${isEnabled}\n\u200b`, inline: true },
                    { name: `${prefix}etiket aktif`, value: "Etiket Sistemini Aktifleştirir." },
                    { name: `${prefix}etiket pasif`, value: "Etiket Sistemini Pasifleştirir." },
                    { name: `${prefix}etiket <etiket>`, value: "Sunucuya yeni katılan üyelerin etiketlerini düzenler.\nBu Kısımda %kullanıcı% yazdığınız kısım kullanıcının adı ile değiştirilir." },
                )

            message.channel.send(infoEmbed);

        }

    }
}

// !etiket aktif
// !etiket pasif
// !etiket <etiket>
