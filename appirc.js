var async   = require('async'),
    fs      = require('fs'),
    irc     = require('irc'),
    //Config.json contains the option object as defined in node-irc as well as the config.server, config.name and config.prefix property
    config  = JSON.parse(fs.readFileSync('ircconfig.json')),
    client  = new irc.Client(config.server, config.name, config),
    ircModules = []
;

client.addListener('registered', function () {
  client.say('NickServ', 'IDENTIFY ' + config.pass);
});

fs.readdir('./textmodules/', function (err, files) {
  //Checks ./textmodules for modules
  async.each(files, function (file, cb) {
    //Requires each module under the name modulejs and pushes it to ircModules
      var name = file.replace('.','');
      name = require('./textmodules/' + file);
      ircModules.push(name);
      cb();
    }, function () {
      client.addListener('message', function (from, to, text) {
        response = '';
        async.each(ircModules, function (ircModule, cb) {
           if (RegExp('^\\' + config.prefix + ircModule.trigger, 'i').test(text)) {
             ircModule.run(text, function (data) {
                 response += data;
                 cb();
             });
           } else if (RegExp('^\\' + config.prefix + 'help$', 'i').test(text)) {
             response += ircModule.trigger + ', ';
             cb();
           } else if (RegExp('^\\' + config.prefix + 'help ' + ircModule.trigger, 'i').test(text)) {
             response += ircModule.help;
             cb();
           }
         }, function () {
           if (RegExp('^\\' + config.prefix + 'help$', 'i').test(text)) {
             response = 'All commands use the prefix "' + config.prefix + '" and available commands are: help (this info), '+
                        response + '. You can get detailed help using "' + config.prefix + 'help [command](w/o prefix)"';
           }
           if (to.indexOf('#') !== -1) client.say(to, response);
           else client.say(from, response);
        });
      });
    }
  );
});
