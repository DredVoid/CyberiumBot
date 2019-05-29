var discord = require('discord.js');
var client = new discord.Client();
var prefix = ';';
var noblox = require('noblox.js');

function isCommand(command, message){
	var command = command.toLowerCase();
	var content = message.content.toLowerCase();
	return content.startsWith(prefix + command);
}

client.on("ready", () => {
	client.user.setActivity(`Learning JS`);
    console.log("Successfully logged in Discord Bot!")
    let onShout = noblox.onShout(4914769)
    onShout.on('data', function(post){
        let embed = new discord.RichEmbed()
        .setTitle(`Shout updated by ${post.poster.username}!`)
        .setDescription(post.body)
        .setThumbnail(client.user.avatarURL)
        .setTimestamp()
        .setColor("#4286f4")
        .setFooter("Powered by DredVoid", client.user.avatarURL)
        client.channels.get("577142100609466456").send("@here")
        client.channels.get("577142100609466456").send({embed})
    })
});

client.on('message', (message) => {
	if (message.author.bot) return;
	var args = message.content.split(/[ ]+/)
	if(isCommand('test', message)){
		message.reply('Hello!')
	}
    if (isCommand('profile', message)){
        let username = args[1]
        if (username) {
            noblox.getIdFromUsername(username).then(id => {
                if (id) {
                    noblox.getPlayerInfo(parseInt(id)).then(function(info){
                        let embed = new discord.RichEmbed()
                        .setTitle(info.username + "'s Profile")
                        .setURL(`https://roblox.com/users/${id}/profile`)
                        .setDescription(info.status || '')
                        .setColor("#4286f4")
                        .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`)
                        .setTimestamp()
                        .addField("Blurb", info.blurb || "", true)
                        .setFooter("Powered by DredVoid", client.user.avatarURL)
                        message.reply({embed})
                    })
                } else {
                   let embed = new discord.RichEmbed()
                    .setColor("#4286f4")
                    .setTitle("Unable to find that User.")
                    .setTimestamp()
                    .setFooter("Powered by DredVoid", client.user.avatarURL)
                    message.reply({embed}) 
                }
            }).catch(function(err){
                let embed = new discord.RichEmbed()
                .setColor("#4286f4")
                .setTitle("Unable to find that User.")
                .setTimestamp()
                .setFooter("Powered by DredVoid", client.user.avatarURL)
                message.reply({embed})
            })
        } else {
            let embed = new discord.RichEmbed()
            .setColor("#4286f4")
            .setTitle("Please type the Username!")
            .setTimestamp()
            .setFooter("Powered by DredVoid", client.user.avatarURL)
            message.reply({embed})
        }
    }
});

client.login('NTc3MTM3MjI0NzQzOTExNDM0.XNgu6g.PARCDUfSkIKb93Xf3t3oycpOpGI');