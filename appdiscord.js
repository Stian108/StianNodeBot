var async   = require('async'),
    fs      = require('fs'),
    discord     = require('discord.js'),
    //discordconfig.json contains the config.server, config.email, config.pass and config.prefix property
    config  = JSON.parse(fs.readFileSync('discordconfig.json')),
    client  = new discord.Client(),
    discordModules = []
;

client.login(config.email, config.pass);

fs.readdir('./modules/', function (err, files) {
  //Checks ./modules for modules
  async.each(files, function (file, cb) {
    //Requires each module under the name modulejs and pushes it to discordModules
    var name = file.replace('.','');
    name = require('./modules/' + file);
    discordModules.push(name);
    cb();
  }, function () {
    client.on('message', function (msg) {
      response = '';
      async.each(discordModules, function (discordModule, cb) {
        if (RegExp('^\\' + config.prefix + discordModule.trigger, 'i').test(msg.content)) {
          response += discordModule.run(msg.content);
        } else if (RegExp('^\\' + config.prefix + 'help$', 'i').test(msg.content)) {
          response += discordModule.trigger + ', ';
        } else if (RegExp('^\\' + config.prefix + 'help ' + discordModule.trigger, 'i').test(msg.content)) {
          response += discordModule.help;
        }
        cb();
      }, function () {
        if (RegExp('^\\' + config.prefix + 'help$', 'i').test(msg.content)) {
          response = 'All commands use the prefix "' + config.prefix + '" and available commands are: help (this info), '+
                     response + '. You can get detailed help using "' + config.prefix + 'help [command](w/o prefix)"';
        }
        if (response !== '') {
          client.reply(msg, response);
        }
      });
    });
  });
});
