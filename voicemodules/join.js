var discord = require('discord.js');

module.exports.help = 'Syntax: voice join, make the bot join your voicechannel';
module.exports.trigger = 'join';
module.exports.run = function (msg, client) {
  client.joinVoiceChannel(msg.author.voiceChannel);
  client.reply(msg, 'Joined a channel');
};
