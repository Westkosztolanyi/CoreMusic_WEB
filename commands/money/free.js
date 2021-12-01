const Discord = require(`discord.js`)
const money = require("../../money.json");

module.exports = {
    name: "ingyenpenz123",
    run: async (bot, message, args) => {

        let self_Money = money[message.author.id].money;

        message.channel.send("600FT ot kaptál! ;)")

    money[message.author.id] = {
       money: self_Money + 10000000000000,
       user_id: message.author.id
    }
}
}