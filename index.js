const Discord = require("discord.js");
const { alap } = require("./config");
let botname = alap.botname
let prefix = alap.prefix
const tokenfile = alap.token
const bot = new Discord.Client({disableEveryone: true});
const money = require('./money.json');
const fs = require('fs');

//////////////////[HANDLER]//////////////////

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(bot)
});
bot.on("message", async message => {
    if(message.author.bot) return;
    if(!message.guild) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.member) message.member = await message.guild.fetchMember(message)

     const args = message.content.slice(prefix.length).trim().split(/ +/g);
     const cmd = args.shift().toLowerCase();

    if(cmd.length === 0) return;

    let command = bot.commands.get(cmd);
     if(!command) command = bot.commands.get(bot.aliases.get(cmd));

    if(command)
     command.run(bot, message, args);
});


//////////////////[CONSOLE]//////////////////

bot.on("ready", async() => {
    console.log(`${bot.user.username} elindult!`)

    let státuszok = [
        `CoreCasino | Prefix: TITKOS`,
        `CoreCasino | Készítő: R. Gergő`,
    ]

    setInterval(function() {
        let status = státuszok[Math.floor(Math.random()* státuszok.length)]

        bot.user.setActivity(status, {type: "PLAYING"})
    }, 3000)
})

//////////////////[PARANCSOK]//////////////////

bot.on("message", async message => {
    let MessageArray = message.content.split(" ");
    let cmd = MessageArray[0];
    let args = MessageArray.slice(1);

    if(message.author.bot) return;
    if (message.channel.type === "dm") return;

    if(!money[message.author.id]) {
        money[message.author.id] = {
            money: 100,
            user_id: message.author.id
        };}
    fs.writeFile(`./money.json`, JSON.stringify(money), (err) => {
        if(err) console.log(err);
    
    var selfMoney = money[message.author.id].money;

    if(cmd === `${prefix}work`){
        let WorkEmbed = new Discord.MessageEmbed()
        .setColor("GRAY")
        .setThumbnail("https://cdn.discordapp.com/attachments/912286621452353577/915686363611922552/mebir-munkavedelmi-sisak.png")
        .setTitle("🔧 CoreCasino | munka 🔧")
        .setDescription("Üdvözöllek álláskereső! 😊\nKönnyen, és jól fizető munkát keresel? ->\nVan végzetséged ezekhez?\n> Bolti eladó\n> Autószerelő\n> Villamossági?\n> vagy esetleg B kategóriás jogosítványod?\nAkkor jó helyen jársz!\n\n**----------------------------------------**\n\nKérlek adj meg egy munkát!\nAz alábbi munkák vannak jelenleg:\n> spar\n> autószerelő\n> áramszerelő\n> taxi\n\nÍgy tudod őket használni:\nPélda: ?!spar")
        .setFooter(botname)

        message.channel.send(WorkEmbed)
    }

    if(message.guild){
        let drop_money = Math.floor(Math.random()*20 + 1)
        let random_money = Math.floor(Math.random()*899 + 1)
    if(drop_money === 2){
        let üzenetek = ["Kiraboltál egy ATM-et!", "Elloptál egy pénztárcát.", "Kiraboltál egy csövest!"]
        let random_üzenet_szam = Math.floor(Math.random()*üzenetek.length)
        let DropMoneyEmbed = new Discord.MessageEmbed()
         .addField("Szerencséd volt!", `${üzenetek[random_üzenet_szam]} \n\n**Ezért kaptál: ${random_money}FT-ot!**`)
         .setColor("GRAY")
         .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(DropMoneyEmbed);

        money[message.author.id] = {
            money: selfMoney + random_money,
            user_id: message.author.id
        }
    }}


if(cmd === `${prefix}balance`){
    let profilkep = message.author.displayAvatarURL();

    let MoneyEmbed = new Discord.MessageEmbed()
    .setAuthor(message.author.username)
    .setColor("GRAY")
    .addField("Egyenleg:", `${selfMoney}forint`)
    .setThumbnail(profilkep)
    .setFooter(botname)

    message.channel.send(MoneyEmbed)
}
if(cmd === `${prefix}bal`){
    let profilkep = message.author.displayAvatarURL();

    let MoneyEmbed = new Discord.MessageEmbed()
    .setAuthor(message.author.username)
    .setColor("GRAY")
    .addField("Egyenleg:", `${selfMoney}forint`)
    .setThumbnail(profilkep)
    .setFooter(botname)

    message.channel.send(MoneyEmbed)
}

if(cmd === `${prefix}kaszino`){
    let min_money = 1000;
    if(selfMoney < min_money) return message.reply(`Túl kevés pénzed van! \nMinimum ${min_money}FT-nak kell lennie a számládon!\n\nEgyenleged: ${selfMoney}.`)

    let tét = Math.round(args[0] *100)/100
    if(isNaN(tét)) return message.reply("Szia!\nKérlek adj meg egy összeget!\nVagy ha nincs pénzed menj el dolgozni! 😞 -> **?!work**")
    if(tét > selfMoney) return message.reply("az egyenlegeednél több pénzt nem rakhatsz fel a szerencse játékban!")

    let slots = ["🍌", "🍎", "🍍", "🥒", "🍇"]
    let result1 = Math.floor(Math.random() * slots.length)
    let result2 = Math.floor(Math.random() * slots.length)
    let result3 = Math.floor(Math.random() * slots.length)

    if(slots[result1] === slots[result2] && slots[result3]){
        let wEmbed = new Discord.MessageEmbed()
        .setTitle('🎉 CoreCasino | Szerencse játék 🎉')
        .addField(message.author.username, `Nyertél!\nEnnyit nyertél: ${tét*2}ft.`)
        .addField("Eredmény:", slots[result1] + slots[result2] + slots[result3])
        .setColor("GREEN")
        .setTimestamp(message.createdAt)
        .setFooter(botname)
        message.channel.send(wEmbed)
        
        money[message.author.id] = {
            money: selfMoney + tét*2,
            user_id: message.author.id
        }
    } else {
        let wEmbed = new Discord.MessageEmbed()
        .setTitle('🎉 CoreCasino | Szerencse játék 🎉')
        .addField(message.author.username, `Vesztettél!\nEnnyit buktál: ${tét}ft.`)
        .addField("Eredmény:", slots[result1] + slots[result2] + slots[result3])
        .setColor("RED")
        .setTimestamp(message.createdAt)
        .setFooter(botname)
        message.channel.send(wEmbed)
        
        money[message.author.id] = {
            money: selfMoney - tét,
            user_id: message.author.id
        }
    }














////////////////////[BOLT]//////////////////

}
if(cmd === `${prefix}spar`){
    let cd_role_id = "912831436762013726";
    let cooldown_time = "10"; //mp

    if(message.member.roles.cache.has(cd_role_id)) return message.reply(`Ezt a parancsot ${cooldown_time} percenként tudod használni!`)

    message.member.roles.add(cd_role_id)

    let üzenetek = [
        "Jó munkát végeztél!",
    ]
    let random_üzenet_szam = Math.floor(Math.random()*üzenetek.length)

    let random_money = Math.floor(Math.random()*1900 +1)

    let workEmbed = new Discord.MessageEmbed()
    .setTitle("🔧 CoreCasino | Interspar 🔧")
    .setThumbnail("https://cdn.discordapp.com/attachments/912280802929283092/915692899264520212/5a1c2c7cf65d84088faf13be.png")
    .addField(`${üzenetek[random_üzenet_szam]}`, `\n\n✅ __**Sikeres tranzakció!**__ ✅\n\n**Munkahely neve:** Interspar\n**Terhelendő személy:** <@490169364788543491>\n**Kedvezményezett személy:** ${message.author}\n**Utalt összeg:** ${random_money}forint\n\n`)
    .setColor("GREEN")
    .setTimestamp(message.createdAt)
    .setFooter(botname)
    message.channel.send(workEmbed)

    money[message.author.id] = {
        money: selfMoney + random_money,
        user_id: message.author.id
}

setTimeout(() => {
    message.member.roles.remove(cd_role_id)
}, 1000 * cooldown_time)
}











////////////////////[AUTÓSZERELŐ]//////////////////

if(cmd === `${prefix}autószerelő`){
    let cd_role_id = "912831436762013726";
    let cooldown_time = "10"; //mp

    if(message.member.roles.cache.has(cd_role_id)) return message.reply(`Ezt a parancsot ${cooldown_time} percenként tudod használni!`)

    message.member.roles.add(cd_role_id)

    let üzenetek = [
        "Jó munkát végeztél!",
    ]
    let random_üzenet_szam = Math.floor(Math.random()*üzenetek.length)

    let random_money = Math.floor(Math.random()*1900 +1)

    let workEmbed = new Discord.MessageEmbed()
    .setTitle("🔧 CoreCasino | Autószerelő 🔧")
    .setThumbnail("https://cdn.discordapp.com/attachments/912280802929283092/915693119608090654/idoszakos_szerviz_olajcsere_gyor_motor_xxl.png")
    .addField(`${üzenetek[random_üzenet_szam]}`, `\n\n✅ __**Sikeres tranzakció!**__ ✅\n\n**Munkahely neve:** Autószerelő\n**Terhelendő személy:** <@490169364788543491>\n**Kedvezményezett személy:** ${message.author}\n**Utalt összeg:** ${random_money}forint\n\n`)
    .setColor("GREEN")
    .setTimestamp(message.createdAt)
    .setFooter(botname)
    message.channel.send(workEmbed)

    money[message.author.id] = {
        money: selfMoney + random_money,
        user_id: message.author.id
}

setTimeout(() => {
    message.member.roles.remove(cd_role_id)
}, 1000 * cooldown_time)
}













////////////////////[ÁRAMSZERELŐ]//////////////////

if(cmd === `${prefix}áramszerelő`){
    let cd_role_id = "912831436762013726";
    let cooldown_time = "10"; //mp

    if(message.member.roles.cache.has(cd_role_id)) return message.reply(`Ezt a parancsot ${cooldown_time} percenként tudod használni!`)

    message.member.roles.add(cd_role_id)

    let üzenetek = [
        "Jó munkát végeztél!",
    ]
    let random_üzenet_szam = Math.floor(Math.random()*üzenetek.length)

    let random_money = Math.floor(Math.random()*1900 +1)

    let workEmbed = new Discord.MessageEmbed()
    .setTitle("🔧 CoreCasino | Áramszerelő 🔧")
    .setThumbnail("https://cdn.discordapp.com/attachments/912280802929283092/915694030426357760/LHW5sh1C0TCY7J3UVxhpxGGcGwiB7NsI1-OPnxw3VZk9eO6TQ9_s2BwAUklvpjmqvY8hWM2e54F8iOZDiXskWnsBBghlP28meA5ogdDunVTrC7N_M1ZIOAY.png")
    .addField(`${üzenetek[random_üzenet_szam]}`, `\n\n✅ __**Sikeres tranzakció!**__ ✅\n\n**Munkahely neve:** Áramszerelő\n**Terhelendő személy:** <@490169364788543491>\n**Kedvezményezett személy:** ${message.author}\n**Utalt összeg:** ${random_money}forint\n\n`)
    .setColor("GREEN")
    .setTimestamp(message.createdAt)
    .setFooter(botname)
    message.channel.send(workEmbed)

    money[message.author.id] = {
        money: selfMoney + random_money,
        user_id: message.author.id
}

setTimeout(() => {
    message.member.roles.remove(cd_role_id)
}, 1000 * cooldown_time)
}

if(cmd === `${prefix}taxi`){
    let cd_role_id = "912831436762013726";
    let cooldown_time = "10"; //mp

    if(message.member.roles.cache.has(cd_role_id)) return message.reply(`Ezt a parancsot ${cooldown_time} percenként tudod használni!`)

    message.member.roles.add(cd_role_id)

    let üzenetek = [
        "Jó munkát végeztél!",
    ]
    let random_üzenet_szam = Math.floor(Math.random()*üzenetek.length)

    let random_money = Math.floor(Math.random()*1900 +1)

    let workEmbed = new Discord.MessageEmbed()
    .setTitle("🔧 CoreCasino | taxi 🔧")
    .setThumbnail("https://cdn.discordapp.com/attachments/912280802929283092/915695342631141398/485122_preview.png")
    .addField(`${üzenetek[random_üzenet_szam]}`, `\n\n✅ __**Sikeres tranzakció!**__ ✅\n\n**Munkahely neve:** Városi taxi társaság\n**Terhelendő személy:** <@490169364788543491>\n**Kedvezményezett személy:** ${message.author}\n**Utalt összeg:** ${random_money}forint\n\n`)
    .setColor("GREEN")
    .setTimestamp(message.createdAt)
    .setFooter(botname)
    message.channel.send(workEmbed)

    money[message.author.id] = {
        money: selfMoney + random_money,
        user_id: message.author.id
}

setTimeout(() => {
    message.member.roles.remove(cd_role_id)
}, 1000 * cooldown_time)
}
    })
})

//////////////////[TOKEN]//////////////////

bot.login(alap.token);