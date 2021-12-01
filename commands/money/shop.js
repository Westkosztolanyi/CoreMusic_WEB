const Discord = require("discord.js");
const { alap } = require("../../config");
let botname = alap.botname
let prefix = alap.prefix
module.exports = {
    name: "shop",
    category: "money",
    description: "Shop parancs.",
    run: async (bot, message, args) => {
    let ShopEmbed = new Discord.MessageEmbed()
        .setTitle("🛒 CoreCasino | BOLT 🛒")
        .setDescription(`V.I.P rang - ÁR: 1000FT\n(${prefix}vasarol-vip)`)
        .setColor("GRAY")
        .setThumbnail(bot.user.displayAvatarURL())
        .setFooter(botname)

        message.channel.send(ShopEmbed);

}}