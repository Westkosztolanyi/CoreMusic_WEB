const Discord = require(`discord.js`);
const { alap } = require("../../config");
const money = require("../../money.json");
const botname = alap.botname
module.exports = {
    name: "lb",
    run: async (bot, message, args) => {

let toplist = Object.entries(money)
 .map(v => `<@${v[1].user_id}> - ${v[1].money}FT`)
 .sort((a, b) => b.split("FT")[0] - a.split("FT")[0])
 .slice(0, 5)

let LbEmbed = new Discord.MessageEmbed()
 .setTitle("🏆 CoreCasino | Leadboard 🏆")
 .setColor("YELLOW")
 .addField(`**-------------------------------------------**`, toplist, true)
 .setTimestamp(message.createdAt)
 .setFooter(botname)

message.channel.send(LbEmbed)
}}