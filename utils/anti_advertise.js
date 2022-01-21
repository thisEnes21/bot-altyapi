module.exports = async (message, Tags, Embed) => {

    const inviteCheck = async (guild, code) => {
        return await new Promise((resolve) => {
            guild.fetchInvites().then(invites => {
                for (const invite of invites) {
                    if (code == invite[0]) {
                        resolve(true);
                        return
                    }
                }

                resolve(false);
            })
        })
    }

        if (message.author.bot || message.webhookID) return;

        if (true) {

            if (message.content.includes("discord.gg/")) {

                const code = message.content.split("discord.gg/")[1]

                const isOurInvite = await inviteCheck(message.guild, code);

                if (!isOurInvite) {
                    message.delete()
                    .then(() => {
                        return message.channel.send(Embed("Link Reklam İçeriyor!", `${message.author} Mesajın reklam içerdiği için silindi!`, "error"))
                    })
                    .catch(() => { })
                }

            }

        }
}