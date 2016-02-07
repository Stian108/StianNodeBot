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

fs.readdir('./modules/', function (err, files) {
  //Checks ./modules for modules
  async.each(files, function (file, cb) {
    //Requires each module under the name modulejs and pushes it to ircModules
      var name = file.replace('.','');
      name = require('./modules/' + file);
      ircModules.push(name);
      cb();
    }, function () {
      client.addListener('message', function (from, to, text) {
          async.each(ircModules, function (ircModule, cb) {
             if (text.indexOf(config.prefix + ircModule.trigger) === 0) {
               if (to.indexOf('#') !== -1) {client.say(to, ircModule.run(text));}
               else {client.say(from, ircModule.run(text));}
             }
             cb();
           });
        });
    }
  );
});
