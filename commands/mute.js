const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "mute",
    description: "Üyeleri susturur.",
    category: "Yetkili",
    cooldown: 5,
    guildOnly: true,
    permission: "ADMINISTRATOR",
    execute(message, args, Embed, Discord) {

        if (!message.member.hasPermission("ADMINISTRATOR"))
            return message.channel.send("Bu komutu Kullanamazsın");
        const user =
            message.guild.member(message.mentions.users.first()) ||
            message.guild.members.cache.get([0]) ||
            message.guild.members.cache.find((user) => user.name === [0]);
        if (![0])
            return message.channel.send(
                "Bir kullanıcı belirt ister etiketleyerek ister id ile ister kullanıc adı ile."
            );
        const time = [30] ? [30] : "x";
        var _time;
        message.react("💬").then(() => message.react("🔈"));
        const filter = (reaction, user) => {
            return (
                ["💬", "🔈"].includes(reaction.emoji.name) &&
                user.id === message.author.id
            );
        };

        message
            .awaitReactions(filter, { max: 1, time: 1800000, errors: ["time"] })
            .then((collected) => {
                const reaction = collected.first();

                if (reaction.emoji.name === "💬") {
                    textMute();
                } else if (reaction.emoji.name === "🔈") {
                    voiceMute();
                }
            })
            .catch((collected) => {
                message.reply("Galiba bu kullanıcı bir ses kanalında değil?!    ");
            });
        const textMute = async () => {
            /**
             * Yazılı kanallardaki susturma kodları (yani bu fonksiyonun içindeki kodlar) Arox#0928'dan aldım.
             */
            var muterol;
            try {
                muterol = await message.guild.roles.create({
                    data: {
                        name: "Muted",
                        color: "BLACK",
                        permissions: [],
                    },
                    reason: "Mute için!",
                });
                message.guild.channels.cache.forEach(async (channel) => {
                    await channel.createOverwrite(muterol, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                    });
                });
            } catch (e) {
                console.log(e.stack);
            }
            await user.roles.add(muterol.id);
            _time =
                time !== "x"
                    ? time + " dakika susturması başladı."
                    : "susturması başladı.";
            message.channel.send(
                user.user.username + " adlı kullanıcının yazılı kanallardaki " + _time
            );
            if (time !== "x") {
                setTimeout(() => {
                    user.roles.remove(muterol.id);
                    message.channel.send(
                        user.user.username +
                        " adlı kullanıcının yazılı kanallardaki " +
                        time +
                        " dakikalık susturması kaldırıldı."
                    );
                }, ms(time));
            }
        };
        const voiceMute = () => {
            user.voice.setMute(true);
            _time =
                time !== "x"
                    ? time + " dakika susturması başladı."
                    : "susturması başladı.";
            message.channel.send(
                member.user.username + " adlı kullanıcının sesli kanallardaki " + _time
            );
            if (time) {
                setTimeout(() => {
                    user.voice.setMute(false);
                    message.channel.send(
                        member.user.username +
                        " adlı kullanıcının sesli kanallardaki " +
                        time +
                        " sürelik susturması kaldırıldı."
                    );
                }, ms(time));
            }
        };
    }
}