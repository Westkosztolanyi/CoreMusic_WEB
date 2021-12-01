const Discord = require(`discord.js`);
const fs = require('fs');
const money = require("../../money.json");
const { alap } = require("../../config");
let botname = alap.botname
let prefix = alap.prefix
module.exports = {
    name: "lotto",
    run: async (bot, message, args) => {

    if(!money[message.author.id]) {
        money[message.author.id] = {
            money: 100,
            user_id: message.author.id
        };}
    fs.writeFile(`../../money.json`, JSON.stringify(money), (err) => {
        if(err) console.log(err);
    });

    
    let self_Money = money[message.author.id].money;


let nyer_loto = Math.floor(Math.random()*1000 + 1)
let nyeremény = (10000)
let min_money = 50;

if(self_Money < min_money) return message.reply(`Túl kevés pénzed van! (Minimum ${min_money}FT-nak kell lennie a számládon!) Egyenleged: ${self_Money}.`)

if(nyer_loto === 2){
    let üzenetek = ["Megnyerted az ötöslottót!.", `Gratulálok a ${nyeremény}FT-os nyereményhez!`]
    let random_üzenet_szam = Math.floor(Math.random()*üzenetek.length)

    let nylottoEmbed = new Discord.MessageEmbed()
     .setTitle('🎉 Szerencse játék | Lotto 🎉')
     .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
     .addField("Szerencséd volt!", `${üzenetek[random_üzenet_szam]} Ezért kaptál: ${nyeremény}FT-ot!`)
     .setColor("GREEN")
     .setThumbnail(message.author.displayAvatarURL())

    message.channel.send(nylottoEmbed);

    money[message.author.id] = {
        money: self_Money + nyeremény,
        user_id: message.author.id

    }

} else {
    let vlottoEmbed = new Discord.MessageEmbed()
     .setTitle('🎉 Szerencse játék | Lotto 🎉')
     .addField(message.author.username, `Vesztettél! Majd legközelebb nyersz.`)
     .setColor("RED")
     .setTimestamp(message.createdAt)
     .setFooter(botname)

    message.channel.send(vlottoEmbed)
    
    money[message.author.id] = {
        money: self_Money - (10),
        user_id: message.author.id
    }
}
}
}