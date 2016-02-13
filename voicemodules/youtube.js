var discord = require('discord.js'),
    yt    = require('youtube-audio-stream')
;

module.exports.help = 'Syntax: voice play, make the bot play music';
module.exports.trigger = 'yt';
module.exports.run = function (msg, client) {
  link = msg.content.split(' ');
  link.splice(0, 1);
  link = link.join(' ');
  //Crashes on leave, needs a fixin'
  client.voiceConnection.playRawStream(yt(link), {volume: 0.125});
  client.reply(msg, 'Plying yt link');
};
