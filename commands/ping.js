module.exports = {
    name: "ping",
    description: "Botun Pingini Gönderir.",
    category: "Genel",
    cooldown: 5,
    aliases: ["p"],
    execute(message, args, Embed){
        const discordPing = message.client.ws.ping;

        message.channel.send(Embed("", "Ping Hesaplanıyor...")).then(msg => {
            const ping = msg.createdTimestamp - message.createdTimestamp;
            msg.edit(Embed("", `Discord Gecikmesi: ${discordPing} ms\n Bot Gecikmesi: ${ping} ms`));
        })
    }
}