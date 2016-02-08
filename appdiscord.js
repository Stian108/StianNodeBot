var async   = require('async'),
    fs      = require('fs'),
    discord     = require('discord.js'),
    //discordconfig.json contains the config.server, config.email, config.pass and config.prefix property
    config  = JSON.parse(fs.readFileSync('discordconfig.json')),
    client  = new discord.Client(),
    discordTextModules = [],
    discordVoiceModules = []
;

client.login(config.email, config.pass);

fs.readdir('./textmodules/', function (err, files) {
  //Checks ./textmodules for modules
  async.each(files, function (file, cb) {
    //Requires each module under the name modulejs and pushes it to discordTextModules
    var name = file.replace('.','');
    name = require('./textmodules/' + file);
    discordTextModules.push(name);
    cb();
  }, function () {
    client.on('message', function (msg) {
      response = '';
      async.each(discordTextModules, function (discordTextModule, cb) {
        if (RegExp('^\\' + config.prefix + discordTextModule.trigger, 'i').test(msg.content)) {
          response += discordTextModule.run(msg.content);
        } else if (RegExp('^\\' + config.prefix + 'help$', 'i').test(msg.content)) {
          response += discordTextModule.trigger + ', ';
        } else if (RegExp('^\\' + config.prefix + 'help ' + discordTextModule.trigger, 'i').test(msg.content)) {
          response += discordTextModule.help;
        }
        cb();
      }, function () {
        if (RegExp('^\\' + config.prefix + 'help$', 'i').test(msg.content)) {
          response = 'All commands use the prefix "' + config.prefix + '" and available commands are: help (this info), '+
                     response + '. You can get detailed help using "' + config.prefix + 'help [command](w/o prefix)". ' +
                     'For voice bot see "' + config.prefix + 'voice help"';
        }
        if (response !== '') {
          client.reply(msg, response);
        }
      });
    });
  });
});

fs.readdir ('./voicemodules/', function (err, files) {
  async.each(files, function (file, cb) {
    var name = file.replace('.', '');
    name = require('./voicemodules/' + file);
    discordVoiceModules.push(name);
    cb();
  }, function () {
    client.on('message', function (msg) {
      response = '';
      async.each(discordVoiceModules, function (discordTextModule, cb) {
        if (RegExp('^\\' + config.prefix + 'voice ' + discordVoiceModule.trigger, 'i').test(msg.content)) {
          //Have the modules use the bot
          discordVoiceModule.run(msg);
        } else if (RegExp('^\\' + config.prefix + 'voice help$', 'i').test(msg.content)) {
          response += discordVoiceModule.trigger + ', ';
        } else if (RegExp('^\\' + config.prefix + 'voice help ' + discordVoiceModule.trigger, 'i').test(msg.content)) {
          response += discordVoiceModule.help;
        }
        cb();
      }, function () {
        if (response !== '') {
          client.reply(msg, response);
        }
      });
    });
  });
});
