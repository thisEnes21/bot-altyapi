module.exports = async (message, Tags, Embed) => {

        const tag = await Tags.findOne({ where: { guild_id: message.guild.id } })
        if (tag.get("link_protect_enabled")) {

            const possibleLinks = [".com", ".tv", ".net", ".xyz", ".io", ".me", ".gg", "www.", "http", ".org", ".biz", ".party", ".rf.gd", ".az"];
            possibleLinks.some(word => {
                if (message.content.toLowerCase().includes(word)) {

                    message.delete()
                    .then(() => {
                        return message.channel.send(Embed("Link Tespit Edildi!", `${message.author} Gönderdiğin mesaj **Link** içeriyor, Lütfen daha dikkatli ol!`, "error"))
                    })
                    .catch(() => {});

                }
            })

        }
}