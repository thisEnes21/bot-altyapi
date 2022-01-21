module.exports = {
    name: "test",
    execute(message, args, Embed, Discord, Tags, tag, emojis){
        message.channel.send(emojis(message, "nah"));
    }
}