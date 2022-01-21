const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "REACTION"] });
const fs = require('fs');
const { token, developer_id } = require('./config.json');

const { CaptchaGenerator } = require("captcha-canvas")
const dbutton = require("discord-buttons")
dbutton(client)

let button = new dbutton.MessageButton().setLabel("Kayıt ol").setStyle("grey").setID("kayit")
let embed = new Discord.MessageEmbed().setDescription(`Kayıt olman gerek, aşağıdaki tuşa tıkla!`).setColor("RANDOM")
client.on("message", async (msg) => {
    if (msg.channel.id == "KAYIT KANAL ID" && !msg.author.bot && msg.author.id == "SİZİN ID'NİZ") {
        msg.channel.send({ embed: embed, buttons: [button] })
    }
})

client.on("clickButton", async (button) => {
    await button.reply.think(true)
    let member = button.clicker.user.id
    member = button.guild.members.cache.get(member)
    member.roles.remove("KAYITSIZ ROL ID");
    member.roles.add("ÜYE ROL ID");
    await button.reply.edit(new Discord.MessageEmbed().setDescription("Kayıt başarılı").setColor("RANDOM"))
})


client.on("messageDelete", async (message) => {
    if (message.author.bot) return;
    db.push(`snipe.${message.guild.id}`, { msg: message.content, tarih: Date.now(), admin: message.author, channel: message.channel.id })
})

// Utils
const Embed = require('./utils/embed.js')
const database = require('./utils/database.js');
const emojis = require('./utils/emojis');
const auto_role = require("./utils/autoRole");
const bot_join_leave = require("./utils/bot-join-leave");
const linkprotect = require("./utils/linkprotect");
const anti_advertise = require("./utils/anti_advertise");
const player_join_leave = require("./utils/player-join-leave");
const statics = require("./utils/statistics");
const tagExecute = require("./utils/tagExecute");
const { permission } = require('./commands/otorol');


// Database
const Tags = database();

// Collections
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();


// Commands
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

commandFiles.forEach(file => {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command);
})

// Event Handlers
client.once('ready', async () => {
    console.log("Bot Çalıştırıldı!");
    console.log("Hazır.");

    client.user.setActivity("!yardım")

    client.on('message', msg => {
        if (msg.content.toLowerCase() === '!site') {
            msg.reply('https://thisenes.epizy.com'); // değiştirebilirsiniz :)
        }

    });

    // Database
    await Tags.sync();

    // Utils
    auto_role(client, Tags);
    bot_join_leave(client, Tags);
    player_join_leave(client, Tags, Embed, Discord);
    statics(client, Tags);
    tagExecute(client, Tags);


    // Database check
    // Ekleme
    const servers = [];
    client.guilds.cache.forEach(async guild => {
        servers.push(guild.id);
        const tag = await Tags.findOne({ where: { guild_id: guild.id } })
        if (tag == null) {
            await Tags.create({ guild_id: guild.id })
        }
    })

    // Çıkarma
    await Tags.findAll().then(g_list => {
        g_list.forEach(async guild_db => {
            const db_id = guild_db.dataValues.guild_id;
            if (!servers.includes(db_id)) {
                await Tags.destroy({ where: { guild_id: db_id } });
            }
        })
    })

})


client.on('message', async (message) => {

    if (message.author.bot || message.webhookID) return;

    const tag = await Tags.findOne({ where: { guild_id: message.guild.id } })

    const args = message.content.slice(tag.get("prefix").length).trim().split(/ +/)
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!message.content.startsWith(tag.get("prefix")) || !command) {
        linkprotect(message, Tags, Embed);
        anti_advertise(message, Tags, Embed);
        return
    }

    // Guild Control
    if (command.guildOnly && message.channel.type == "dm") return message.channel.send(Embed("", "Bu Komutu Yanlızca Sunucularda Kullanabilirsin!", "error"))

    // Developer Only Commands
    if (command.developerOnly && message.author.id != developer_id) return message.channel.send(Embed("", "**Bu Komutu Sadece Sahibim Kullanabilir!**"))

    // Cooldown
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const timestamps = cooldowns.get(command.name);
    const now = Date.now();
    const cooldownAmount = (command.cooldown || 3) * 1000;
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (expirationTime > now) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.channel.send(Embed("", `Bu Komutu Tekrar Kullanmak İçin Lütfen ${parseInt(timeLeft)} Saniye Bekleyin.`))
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => {
        timestamps.delete(message.author.id)
    }, cooldownAmount);

    try {
        command.execute(message, args, Embed, Discord, Tags, tag, emojis);
    }

    catch (e) {
        console.error(e);
        message.channel.send(Embed("", "Bir Hata Oluştu, Kodlarını Kontrol Et!", "error"));
    }

})

client.login(token);