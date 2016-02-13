var discord = require('discord.js');

module.exports.help = 'Syntax: voice stop, make the bot shut up';
module.exports.trigger = 'stop';
module.exports.run = function (msg, client) {
  client.voiceConnection.stopPlaying();
  client.reply(msg, 'Stopped playing music');
};
