module.exports = {
    name: "eval",
    execute(message, args){
        let { MessageEmbed } = require("discord.js")
        if(!args[0]) return message.channel.send("Lütfen çalıştırılacak kodu yazın.")
        if(message.author.id !== "805520197972262972") return message.channel.send("Bu komutu sadece <@805520197972262972> kullanabilir.")
        try{ 
        let komut = eval(args.join(" "))
        let potansiyelÇıkışlar = ["string", "boolean", "number", "float"]
        if(potansiyelÇıkışlar.includes(typeof komut)){
            let embed = new MessageEmbed()
            .setDescription("**Başarılı**")
            .addField("📥 Giriş", "```js\n" + args.join(" ") + "\n```")
            .addField("📤Çıkış", "```js\n" + komut + "\n```")
            .setColor("GREEN")
            message.channel.send(embed) 
            message.react("✅")
        }else{
            let embed = new MessageEmbed()
            .setDescription("**Başarılı**")
            .addField("📥 Giriş", "```js\n" + args.join(" ") + "\n```")
            .addField("📤 Çıkış, ```\n" + "Eylem Gerçekleşti" + "\n```")
            .setColor("GREEN")
            message.channel.send(embed) 
            message.react("✅")
        }
    } catch (err){

        let embed = new MessageEmbed()
            .setDescription("**Hata**")
            .addField("📥 Giriş", "```js\n" + args.join(" ") + "\n```")
            .addField("📤 Çıkış", "```\n" + err + "\n```")
            .setColor("RED")
            message.channel.send(embed) 
            message.react("❎")

    }
    }
}