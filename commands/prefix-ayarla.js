module.exports = {
    name: "prefix-ayarla",
    category: "Yetkili",
    description: "Botun prefixini değiştirmeye yarar.",
    cooldown: 5,
    guildOnly: true,
    aliases: ["prefixayarla", "prefix"],
    async execute(message, args, Embed, Discord, Tags, tag) {

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(("", "Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın."));
        
        if (!args[0]) return message.channel.send(Embed("", "Lütfen yeni prefixi giriniz.", "info"));
        if (args[0].length > 5) return message.channel.send(Embed("", "Prefix en fazla 5 karakter uzunluğunda olabilir."));

        await Tags.update({ prefix: args[0] }, { where: { guild_id: message.guild.id } });
        return message.channel.send(Embed("", `Prefix başarıyla \`${args[0]}\` Olarak ayarlandı.`));


    }
}