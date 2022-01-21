module.exports = {
  name: "yardım",
  cooldown: 5,
  guildOnly: true,
  aliases: ['help'],
  execute(message, args, Embed, Discord, Tags, tag, emojis) {

      const prefix = tag.get("prefix");

      const infoEmbed = new Discord.MessageEmbed()
          .setDescription("╔═══════════◥◣❖◢◤════════════╗\n\u200b**EBot Yardım Paneline Hoşgeldin!**\u200B")
          .addFields(
              { name: "\n\u200b", value: `💬 | **${prefix}genel**\n\u200bBotumuzda bulunan Genel komutlarını listeler.`, inline: false },
              { name: `\n\u200b`, value: `🚫 | **${prefix}yetkili**\n\u200bBotumuzda bulunan Yetkili komutlarını listeler.`, inline: false },
              { name: `\n\u200b`, value: `🛡️ | **${prefix}güvenlik**\n\u200bBotumuzda bulunan Güvenlik komutlarını listeler.`, inline: false },
              { name: `\n\u200b`, value: `🤖 | **${prefix}bot**\n\u200bBotun genel komutlarını listeler.\n\u200b╚═══════════◥◣❖◢◤════════════╝`, inline: false },
              { name: "\u200B", value: "[👍 Sunucuna Ekle](https://discord.com/api/oauth2/authorize?client_id=855063583179014144&permissions=0&scope=bot)", inline: true },
              { name: "\u200B", value: "[📝 Resmi Sunucu](https://discord.gg/eqDga6S6XE)", inline: true },
              { name: "\u200B", value: "[🌐 Websitemiz](https://thisenes.epizy.com)", inline: true },
          )
          .setColor("YELLOW")
          .setFooter("EBot", "https://i.hizliresim.com/loix1to.png")
          //.setImage("https://i.hizliresim.com/pxy49k0.png")

      message.channel.send(infoEmbed);

  }
}

// \n\u200b
// \u200B