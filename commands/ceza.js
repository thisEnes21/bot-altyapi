const Discord = require("discord.js");
const db = require("quick.db");
const ms = require('ms');
const moment = require("moment")
module.exports = {
    name: "ceza",
    description: "Kişiyi cezalandırır.",
    category: "Yetkili",
    guildOnly: true,
    permission: "MANAGE_MEMBERS",
    execute(message, client, args) {

  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!member) return message.reply(new Discord.MessageEmbed()
  .setAuthor(`${message.author.tag}`,message.author.avatarURL())
  .setColor("#363636").setDescription(`Ceza Verilecek Bir Üye Etiketle veya ID'sini Gir`))
  
  const onay = new Discord.MessageEmbed()
.setAuthor(`${message.author.tag}`,message.author.avatarURL())
.setColor("#363636")
.setDescription(`${member} Kişisine ne olacağını seç.\n\n1.\`Küfür & Argo Kanal Türü: "Yazı Kanalı"\`\n2.\`Reklam ve Ticaret Kanal Türü: "Yazı Kanalı"\``)
message.reply(onay)
.then(() => {
    member.roles.add("906598748593991700")
  message.channel.awaitMessages(response => response.content === "1", {
    max: 1,
    time: 30000,
    errors: ['time'],
  })
  .then((collected) => {
      const yenidenbasliyorum = new Discord.MessageEmbed()
      .setColor("#363636")
      .setDescription(`${member} Adlı kullanıcı 30 dakika boyunca susturuldu.`)
      message.reply(yenidenbasliyorum).then(message => {
    }).catch(console.error)
    })
    })
.then(() => {
    member.roles.add("906598748593991700")
  message.channel.awaitMessages(response => response.content === "2", {
    max: 1,
    time: 30000,
    errors: ['time'],
  })
  .then((collected) => {
      const yenidenbasliyorum2 = new Discord.MessageEmbed()
      .setColor("#363636")
      .setDescription(`${member} Adlı kullanıcı 30 dakika boyunca susturuldu.`)
      message.reply(yenidenbasliyorum2).then(message => {
    }).catch(console.error)
    })
    .catch(() => {
      const islemiptal = new Discord.MessageEmbed()
      .setColor("#363636")
      .setDescription(`İşlem İptal Edildi`)
      message.reply(islemiptal);
    }).catch(e => { })
});
    }}