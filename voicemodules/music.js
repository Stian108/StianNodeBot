var discord = require('discord.js');

module.exports.help = 'Syntax: voice play, make the bot play music';
module.exports.trigger = 'music';
module.exports.run = function (msg, client) {
  client.voiceConnection.playFile('./music/Cold_Beer.mp3', {volume: 0.125});
  client.reply(msg, 'Now playing Cold Beer');
};
