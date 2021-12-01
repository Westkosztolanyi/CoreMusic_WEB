const Discord = require("discord.js");
const { alap } = require("../../config");
let botname = alap.botname
let prefix = alap.prefix
const money = require('../../money.json')

module.exports = {
    name: "vasarol-vip",
    category: "money",
    description: "Shop parancs.",
    run: async (bot, message, args) => {

        let selfMoney = money[message.author.id].money;
        let viprang_id = "914887893821034516"

        let price = "10000";
        if(message.member.roles.cache.has(viprang_id)) return message.reply("*Ezt a rangot már megvetted!*");
        if(selfMoney < price) return message.reply(`Erre a rangra nincs pénzed! Jelenlegi egyenleged: ${selfMoney}forint.`)

        money[message.author.id] = {
            money: selfMoney - parseInt(price),
            user_id: message.author.id
        }

        message.guild.member(message.author.id).roles.add(viprang_id);

        message.reply("**Köszönjük a vásárlást! Legyen további szép napod!**")
    }
}