module.exports = {
    name: "yazı-tura",
    category: "Genel",
    description: "Bu komutu kullandığınızda yazı veya tura gelir.",
    cooldown: 4,
    aliases: ["y-t","yazıtura"],
    async execute(message, args, Embed, Discord, Tags, tag, emojis){
        
        const msg = await message.channel.send(Embed("", "Yazı Tura Atılıyor..."))

        setTimeout(() => {
            msg.delete();

            //const attachment = new Discord.MessageAttachment("images/yazı.png");
            const randomNumber = (Math.random() * 100) + 1;
            let path = "";
            if(randomNumber <= 50){
                path = "images/yazı.png";
            }
            else{
                path = "images/tura.jpg";
            }

            const attachment = new Discord.MessageAttachment(path);
            message.channel.send(attachment);

        }, 3000);

    }
}