var discord = require('discord.js');

module.exports.help = 'Syntax: voice leave, make the bot leave it\'s current channel';
module.exports.trigger = 'leave';
module.exports.run = function (msg, client) {
  client.voiceConnection.stopPlaying();
  client.leaveVoiceChannel();
  client.reply(msg, 'Left active channel');
};
