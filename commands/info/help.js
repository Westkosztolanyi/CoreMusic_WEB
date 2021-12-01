const { MessageEmbed } = require('discord.js');
const os = require('os');
const internal = require('stream');
const { alap } = require("../../config");
let botname = alap.botname
let prefix = alap.prefix
module.exports = {
    name: `help`,
    category: 'bot',
    run: async (client, message, args) => {
        let versio = require (`../../package.json`).version
        let dcverzio = require (`../../package.json`).dependencies['discord.js']
        let botname = alap.botname

            let help1_Embed = new MessageEmbed()
            .setTitle("❓ CoreCasino | help ❓")
            .setThumbnail("https://cdn.discordapp.com/attachments/914890403403165696/914909943923081297/help.png")
            .setColor("GRAY")
            .addFields(
                {
                    name: `Prefix: ${prefix}`,
                    value: `használat: ${prefix}help`
                },
                {
                    name: `**----------------------**` ,
                    value: `Leadboard - ${prefix}lb\nLottó - ${prefix}lotto\nBolt - ${prefix}shop\nKaszinó - ${prefix}kaszino\nMunka lehetőségek - ${prefix}work\nEgyenleg lekérdezés - ${prefix}bal/balance`,

                },
                
            )
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())


            message.channel.send(help1_Embed)
        }
    }
