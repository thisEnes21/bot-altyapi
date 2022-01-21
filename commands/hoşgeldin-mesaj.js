module.exports = {
    name: "hoşgeldin-mesaj",
    description: "Sunucuya Katılan Üyeler İçin Hoşgeldiniz\nMesajı Gönderir",
    cooldown: 3,
    guildOnly: true,
    permission: "ADMINISTRATOR",
    category: "Güvenlik",
    aliases: ['hm'],
    async execute(message, args, Embed, Discord, Tags, tag, emojis) {

        const data = tag.get("welcome_message");
        const prefix = tag.get("prefix");

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(Embed("","Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın."));
        
        if (args[0] == "kanal") {
            const mentionedChannel = message.mentions.channels.first();
            if (!mentionedChannel) return message.channel.send(Embed("", "Lütfen Bir Kanal Etiketleyiniz.", "info"))

            data.channel_id = mentionedChannel.id;

            await Tags.update({ welcome_message: data }, { where: { guild_id: message.guild.id } })
            return message.channel.send(Embed("", "Hoş Geldiniz Sistemi kanalı başarıyla ayarlandı."))
        }
        else if (args[0] == "mesaj") {
            const text = args.splice(1, args.length - 1).join(" ");
            if (!text) return message.channel.send(Embed("", "Lütfen Bir Mesaj Giriniz.", "info"))

            data.message = text;

            await Tags.update({ welcome_message: data }, { where: { guild_id: message.guild.id } })
            return message.channel.send(Embed("", "Hoş Geldiniz Sistemi Mesajı başarıyla ayarlandı."))
        }
        else if (args[0] == "aktif") {
            data.enabled = true;
            await Tags.update({ welcome_message: data }, { where: { guild_id: message.guild.id } })

            return message.channel.send(Embed("", "Hoşgeldiniz Mesajı Başarıyla Aktifleştirildi"))
        }
        else if (args[0] == "pasif") {
            data.enabled = false;
            await Tags.update({ welcome_message: data }, { where: { guild_id: message.guild.id } })

            return message.channel.send(Embed("", "Hoşgeldiniz Mesajı Başarıyla Pasifleştirildi."))
        }
        else if(args[0] == "test"){
            message.client.emit("guildMemberAdd", message.member);
        }

        else {
            let isEnabled = data.enabled;
            if(isEnabled) isEnabled = "Aktif";
            else isEnabled = "Pasif";

            const infoEmbed = new Discord.MessageEmbed()
                .setTitle(`"Hoş Geldiniz Sistemi"`)
                .setColor("RANDOM")
                .setDescription("═══════════◥◣❖◢◤════════════\n\u200bBu Komutu Kullanarak Hoş Geldiniz Mesajları Oluşturabilirsiniz.\u200B═══════════◥◣❖◢◤════════════\n\u200b ")
                .addFields(
                    { name: `Gereken Yetki:`, value: "Yönetici", inline: true },
                    { name: `Aktiflik Durumu:`, value: `${isEnabled}\n\u200b`, inline: true },
                    { name: `${prefix}hoşgeldiniz-mesaj aktif`, value: "Hoş Geldiniz Mesajını Aktifleştirir." },
                    { name: `${prefix}hoşgeldiniz-mesaj pasif`, value: "Hoş Geldiniz Mesajını Pasifleştirir." },
                    { name: `${prefix}hoşgeldiniz-mesaj mesaj <mesaj>`, value: "Hoş Geldiniz Mesajını Belirler." },
                    { name: `${prefix}hoşgeldiniz-mesaj kanal #kanal`, value: "Hoş Geldiniz Mesajı Kanalını Belirler." },
                    { name: `${prefix}hoşgeldiniz-mesaj test`, value: "Hoş Geldiniz Sistemi Test Mesajını Gönderir." }
                )

            message.channel.send(infoEmbed);
        }

    }
}
